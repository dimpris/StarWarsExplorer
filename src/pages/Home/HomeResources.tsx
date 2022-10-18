import { FC, useState } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableFooter,
  Button,
  Divider,
  IconButton,
  InputBase,
} from "@mui/material";
import { useGetResourceItemsQuery } from '../../services/redux/API.Service';
import { ResourceListItem } from '../../services/redux/Types'
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import Helpers from '../../services/Helpers';
import * as React from 'react';
import { Search as SearchIcon, Menu as MenuIcon } from '@mui/icons-material';

interface HomeResourcesProps {
    resource: string;
}

const HomeResources: FC<HomeResourcesProps> = (props) => {
    const [items, setItems] = useState<Array<ResourceListItem>>([]);
    const [itemsCount, setItemsCount] = useState(0);
    const [nextPageURL, setNextPageURL] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [lastRequestId, setLastRequestId] = useState('');
    const [resource, setResource] = useState(props.resource);

    
    let url = props.resource;
    if (searchTerm !== '') {
        if (resource !== props.resource) {
            setResource(props.resource);
            setSearchTerm('');
            setItems([]);
        } else {
            url += '?search=' + searchTerm;
        }
    } else if (resource === props.resource) {
        url += Helpers.GetUrlLastSegment(nextPageURL);
    } 

    const resourceItems = useGetResourceItemsQuery(url);
    const { currentData, isError, isFetching, requestId} = resourceItems;

    if (currentData && currentData.results.length && requestId && lastRequestId !== requestId) {
        setLastRequestId(requestId);
        setItemsCount(currentData.count);
        const newItems = resource === props.resource && !searchTerm ? 
        [...items, ...currentData.results]
        : currentData.results;
        setItems(newItems);
    }

    const searchClicked = () => {
        setResource(resource + '?search=' + searchTerm);
        setNextPageURL('');
    };

    const searchInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') {
            setItems([]);
        }
    };

    const loadMore = () => {
        if (currentData && currentData.next !== nextPageURL) {
            setNextPageURL(currentData.next);
        }
    };

    const DataGridTpl = () => {
        if (items.length) {
            return (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight: 'bold'}}>Name</TableCell>
                                <TableCell style={{fontWeight: 'bold'}} align="center">Type</TableCell>
                                <TableCell style={{fontWeight: 'bold'}} align="right">Created at</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { items.map( (i) => (
                                <TableRow key={Helpers.GetUrlLastSegment(i.url)}>
                                    <TableCell component="th" scope="row">
                                        <Link to={'/details/' + Helpers.GetUrlPath(i.url)}>
                                            {i.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell style={{ width: 160, textTransform: 'capitalize' }} align="center">
                                        {props.resource}
                                    </TableCell>
                                    <TableCell align="right">
                                        {Helpers.FormatDate(i.created)}
                                    </TableCell>
                                </TableRow>
                            ) ) }
                        </TableBody>
                        <TableFooter>
                        <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="center">
                                    {items.length < itemsCount && currentData && currentData.next ? 
                                    <Button onClick={loadMore} variant="outlined">Load more</Button> 
                                    : ''}
                                </TableCell>
                                <TableCell align='right'>Displaying {items.length} of {itemsCount}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            );
        }

        return (<div></div>);
    };

    return (
        <div className={ isFetching ? styles.Loading : styles.Loaded }>
            { isError ? (<p className={styles.ErrorBox}>Error</p>) : '' }
            <h3 style={{textTransform: 'uppercase'}}>{props.resource}</h3>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, margin: '0 auto 5vh' }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={'Search ' + props.resource}
                    value={searchTerm}
                    onChange={searchInputChanged}
                />
                <IconButton onClick={searchClicked} type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
            <DataGridTpl />
        </div>
    );
}

export default HomeResources;