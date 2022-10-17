import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import styles from './Details.module.css';

interface DetailsProps {}

const Details: FC<DetailsProps> = () => {
  useEffect(AuthService.PreventAccess(useNavigate()));

  
  return (
    <div className={styles.Details} data-testid="Details">
      Details Component
    </div>
  );
}

export default Details;
