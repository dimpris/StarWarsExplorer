import { FC } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@mui/material";
import { useGetResourceItemsQuery } from '../../services/redux/API.Service';

import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import Helpers from '../../services/Helpers';

interface HomeResourcesProps {
    resource: string;
}

const HomeResources: FC<HomeResourcesProps> = (props) => {

    const { data, isError, isLoading } = useGetResourceItemsQuery(props.resource);

    const DataGridTpl = () => {
        if (data) {
            return (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="center">Type</TableCell>
                                <TableCell align="right">Created at</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { data.results.map( (i) => (
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
                    </Table>
                </TableContainer>
            );
        }

        return (<div></div>);
    };

    return (
        <div className={ isLoading ? styles.Loading : styles.Loaded }>
            { isError ? (<p className={styles.ErrorBox}>Error</p>) : '' }
            <h3 style={{textTransform: 'uppercase'}}>{props.resource}</h3>
            <DataGridTpl />
        </div>
    );
}

export default HomeResources;