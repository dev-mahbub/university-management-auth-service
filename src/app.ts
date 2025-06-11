import express, { Application } from 'express';
import cors from 'cors';
import GlobalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/User/user.route';
import { AcademicSemesterRoutes } from './app/modules/AcademicSemister/academicSemester.route';
const app: Application = express();
// const port = 3000;

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application routes
app.use('/api/v1/users/', UserRoutes);
app.use('/api/v1/academic-semesters/', AcademicSemesterRoutes);

//error handling

// //Test
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error logger')
// })

//global error handler
app.use(GlobalErrorHandler);
export default app;
