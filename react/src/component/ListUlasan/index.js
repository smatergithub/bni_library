import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Rating } from 'semantic-ui-react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ListUlasan(props) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ height: '400px', overflow: 'auto' }}>
      {props.data.length > 0 ? (
        <>
          {' '}
          {props.data.map((item) => {
            return (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Nama: {item.user.nama}</div>
                <div style={{ fontSize: '14px', fontWeight: 'normal' }}>Komentar: {item.note}</div>
                <div>
                  {item.rating !== null && (
                    <>
                      <Rating
                        defaultRating={Math.round(item.rating)}
                        maxRating={5}
                        icon="star"
                        disabled
                      />
                    </>
                  )}
                </div>
                {/* <ListItemText primary={item.user.nama} secondary={item.note} /> */}
              </div>
            );
          })}
        </>
      ) : (
        <div>
          <span>Tidak Ada Ulasan</span>
        </div>
      )}
    </div>
  );
}
