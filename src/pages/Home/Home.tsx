import { FC, useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthService from '../../services/AuthService';
import { useGetResourcesQuery } from '../../services/redux/API.Service';
import HomeResources from './HomeResources';

import styles from './Home.module.css';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  useEffect(AuthService.PreventAccess(useNavigate()));
  const [selectedResource, setSelectedResource] = useState('');
  const { data, error, isLoading } = useGetResourcesQuery('');

  let { type } = useParams();

  if (type && type !== selectedResource) {
    setSelectedResource(type);
  }

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

  const dataTemplate = () => (
    <div className={styles.Home} data-testid="Home">
      <ButtonGroup className={styles.Buttons} variant="contained" aria-label="outlined primary button group">
        {resources.map((res) => (
          <Button key={res}>
            <Link className={styles.Button} to={'/home/' + res}>{res}</Link>
          </Button>
        ))} 
      </ButtonGroup>
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
