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
  IconButton,
  InputAdornment,
  OutlinedInput,
  useMediaQuery,
} from "@mui/material";
import { useGetResourceItemsQuery } from '../../services/redux/API.Service';
import { ResourceListItem } from '../../services/redux/Types'
import styles from '../../Common.module.css';
import { Link } from 'react-router-dom';
import Helpers from '../../services/Helpers';
import * as React from 'react';
import { HighlightOff } from '@mui/icons-material';
import json2mq from 'json2mq';

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
    
    const matches = useMediaQuery(
        json2mq({
            minWidth: 600,
        }),
    );
    
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

    if (resource !== props.resource && !searchTerm) {
        setResource(props.resource);
        setItems([]);
        setNextPageURL('');
    }

    const resourceItems = useGetResourceItemsQuery(url);
    const { currentData, isError, isFetching, requestId} = resourceItems;

    if (currentData && currentData.results && requestId && lastRequestId !== requestId) {
        setLastRequestId(requestId);
        setItemsCount(currentData.count);
        const newItems = resource === props.resource && !searchTerm ? 
        [...items, ...currentData.results]
        : currentData.results;
        setItems(newItems);
    }

    const searchClear = () => {
        setSearchTerm('');
        setItems([]);
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
        if (items) {
            return (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 320 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight: 'bold'}}>Name</TableCell>
                                <TableCell style={{fontWeight: 'bold'}} align="center">Type</TableCell>
                                { matches ? <TableCell style={{fontWeight: 'bold'}} align="right">Created at</TableCell> : '' }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { items.map( (i) => (
                                <TableRow key={i.type + '_' + Helpers.GetUrlLastSegment(i.url)}>
                                    <TableCell component="th" scope="row">
                                        <Link to={'/details/' + Helpers.GetUrlPath(i.url)}>
                                            {i.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell style={{ textTransform: 'capitalize' }} align="center">
                                        {i.type}
                                    </TableCell>
                                    { matches ? 
                                    <TableCell align="right">
                                        {Helpers.FormatDate(i.created)}
                                    </TableCell>
                                     : '' }
                                </TableRow>
                            ) ) }
                        </TableBody>
                        <TableFooter>
                        <TableRow>
                                { matches ? 
                                <TableCell></TableCell>
                                : <TableCell align='left'>Displaying {items.length} of {itemsCount}</TableCell> }
                                <TableCell align="center">
                                    {items.length < itemsCount && currentData && currentData.next ? 
                                    <Button onClick={loadMore} variant="outlined">Load more</Button> 
                                    : ''}
                                </TableCell>
                                { matches ? 
                                <TableCell align='right'>Displaying {items.length} of {itemsCount}</TableCell>
                                : '' }
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
            <div className={styles.SearchContainer}>
                { matches ?
                <h3 style={{textTransform: 'uppercase'}}>{props.resource}</h3>
                : <h4 style={{textTransform: 'capitalize'}}>{props.resource}</h4>}
                <div>
                    <OutlinedInput
                    size={ matches ? 'medium' : 'small' }
                    id="outlined-adornment-password"
                    type="text"
                    value={searchTerm}
                    onChange={searchInputChanged}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={searchClear}
                            edge="end"
                            >
                                { searchTerm ? <HighlightOff /> : '' }
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                    />
                </div>
            </div>
            <DataGridTpl />
        </div>
    );
}

export default HomeResources;