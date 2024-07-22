import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';

import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import AlertBanner from '../../components/AlertBanner';

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  // optionType: 'scoops' | 'toppings'
  useEffect(() => {
    setError(false);
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => setError(true));
  }, [optionType]);

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

  if (error) return <AlertBanner label="Server Error. Please try again later." />;

  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.name}>
          <ItemComponent item={item} />
        </Grid>
      ))}
    </Grid>
  );
}
