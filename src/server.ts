import http from 'http';
import app from './app';

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));