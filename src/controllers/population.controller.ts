
import { Request, Response } from 'express';
import { Op } from 'sequelize'; 
import sequelize from '../config/sequelize';
import ResidentDto from '../dtos/ResidentDto';
import Resident from '../models/Resident';


export const getLargestPopulation = async (req: Request, res: Response) => {
  try { 
    const residentsDto: { name: string; birth_year: number; death_year?: string | number }[] = req.body;
    await sequelize.sync({ force: true }); 

     
    await Resident.bulkCreate(residentsDto);
 
    const residents = await Resident.findAll();

    
    res.json(calculateUsersInMostPopulatedInterval(residents));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

function calculateUsersInMostPopulatedInterval(users: ResidentDto[]) {
  let yearsMap = new Map();
  let current = new Date().getFullYear()
  users.forEach(e => {
      yearsMap.set(e.death_year || current, {count: 0, users: []})
  })

  let result = []
  for(let i = 1; i < users.length; i++) {
      for (const [year, obj] of yearsMap) {
          if(users[i].birth_year <= year && (users[i].death_year || current) >= year) {
              yearsMap.set(year, {count: obj.count + 1, users: [...obj.users, users[i]]})
          }
      }
  }

  for (const [year, obj] of yearsMap) {
      result.push(Object.assign({year}, obj))
  }

  result = result.sort((a,b) => a.year - b.year)
  
  return result
}





  
