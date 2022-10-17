import { FC, useEffect, useState } from 'react';
import {
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthService from '../../services/AuthService';
import { useGetResourcesQuery } from '../../services/redux/API.Service';
import HomeResources from './HomeResources';

import styles from './Home.module.css';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  useEffect(AuthService.PreventAccess(useNavigate()));

  const [selectedResource, setSelectedResource] = useState('');

  const { data, error, isLoading } = useGetResourcesQuery('');

  const loadingTemplate = () => (
    <div>
      <h2>Loading...</h2>
    </div>
  );

  const errorTemplate = () => {
    return (
      <div>
        <h2 className={styles.ErrorBox}>Error</h2>
      </div>
    );
  };

  const onResourceChange = (e: any, v: string) => {
    setSelectedResource(v);

    
  };

  const dataTemplate = () => (
    <div className={styles.Home} data-testid="Home">
      <ToggleButtonGroup
        value={selectedResource}
        className={styles.Buttons}
        exclusive
        onChange={onResourceChange}
        >
          {resources.map((res) => (
          <ToggleButton key={res} value={res} sx={{textTransform: 'capitalize'}}>
            {res}
          </ToggleButton>
          ))}
        </ToggleButtonGroup>
        { selectedResource === '' ? '' : <HomeResources resource={selectedResource} /> }
        
    </div>
  );

  if (isLoading) return loadingTemplate();
  if (error) return errorTemplate();

  let resources: Array<string> = [];
  if (data) {
    resources = Object.keys(data);
  }

  return dataTemplate();
}
export default Home;
