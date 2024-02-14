 
import express from 'express';
import sequelize from './config/sequelize';
import Resident from './models/Resident';
import routes from './routes';

const app = express();
const PORT = 3030;
 
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 
app.use('/', routes);

export default app;
