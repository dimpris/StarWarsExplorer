import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import styles from './Details.module.css';

interface DetailsProps {}
interface DetailsParams {
  type: string;
  id: number;
}

const Details: FC<DetailsProps> = () => {
  useEffect(AuthService.PreventAccess(useNavigate()));
  let params = useParams();
  
  return (
    <div className={styles.Details} data-testid="Details">
      Details Component {params.type} {params.id}
    </div>
  );
}

export default Details;
