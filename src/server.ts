import './setup';
import app from './app';

app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is listening on port ${process.env.PORT}.`);
});
