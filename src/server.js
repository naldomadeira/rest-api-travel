import environment from './config/environment';
import app from './app';

app.listen(environment.application.port, () => {
    console.log(`Server is running on: ${environment.application.uri}`);
});
