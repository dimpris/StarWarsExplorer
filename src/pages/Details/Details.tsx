import React, { FC } from 'react';
import styles from './Details.module.css';

interface DetailsProps {}

const Details: FC<DetailsProps> = () => (
  <div className={styles.Details} data-testid="Details">
    Details Component
  </div>
);

export default Details;
