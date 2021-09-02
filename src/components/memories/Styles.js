import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  
  modal: {
   
    width: '80%',
    height: '80%',
    margin: '50px auto'

  },
  pagination: {
    display: 'inline',
  },
  pages: {
    padding: '5px',
    margin: '0px 0px 10px 0px',
    alignItems: 'center',
  },
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  media: {
    height: 0,
    paddingTop: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  media1: {
    paddingTop: '60%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundSize: 'cover'

  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    borderRadius: '5px',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '40px',
    color: 'white',
  },
  overlay3: {
    position: 'absolute',
    top: '20px',
    right: '0px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));