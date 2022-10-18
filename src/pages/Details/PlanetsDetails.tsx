import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import styles from './Details.module.css';
import c_styles from '../../Common.module.css';
import { useGetPlanetsDetailsQuery } from '../../services/redux/API.Service';
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from '@mui/material';
import Helpers from '../../services/Helpers';

const PlanetsDetails: FC = () => {
  useEffect(AuthService.PreventAccess(useNavigate()));
  const params = useParams();
  let itemId = 0;

  if (params.id && !Number.isNaN( Number(params.id) )) {
    itemId = Number(params.id);
  }

  const {data, isFetching, isError} = useGetPlanetsDetailsQuery(itemId);
  
  let hasError = isError && data === undefined;
  let name = data && data.name ? data.name : '';

  const paramValues = Helpers.GetModelParamVaulesArray(data);
  
  return (
    <div className={ isFetching ? c_styles.Loading : c_styles.Loaded }>
      { hasError ? (<p className={c_styles.ErrorBox}>Error</p>) : '' }
      <h3>{name}</h3>
      <h4 style={{color: 'rgba(0, 0, 0, 0.6)'}}>(Planets)</h4>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }}>
          <TableBody>
            {paramValues.map((p, i) => (
              <TableRow className={ i % 2 === 0 ? styles.RowEven : styles.RowOdd } key={'param'+i}>
                <TableCell align="right">{p.name}:</TableCell>
                <TableCell>{p.value} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PlanetsDetails;
