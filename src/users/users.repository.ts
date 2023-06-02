import { Injectable, NotFoundException } from '@nestjs/common';
import DatabaseService from '../modules/database/database.service';
import { plainToInstance } from 'class-transformer';
import PostModel from '../posts/post.model';
import UserModel from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import isRecord from '../utils/isRecord';
import PostgresErrorCode from '../modules/database/postgresErrorCode.enum';
import UserAlreadyExistsException from './exceptions/userAlreadyExists.exception';
import { isDatabaseError } from '../types/databaseError';

@Injectable()
class UsersRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getByEmail(email: string) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT users.*,
        addresses.street AS address_street, addresses.city AS address_city, addresses.country AS address_country
        FROM users
        LEFT JOIN addresses ON users.address_id = addresses.id
        WHERE email=$1
    `,
      [email],
    );
    const entity = databaseResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return new UserModel(entity);
  }

  private async createUserWithAddress(userData: CreateUserDto) {
    try {
      const databaseResponse = await this.databaseService.runQuery(
        `
      WITH created_address AS (
        INSERT INTO addresses (
          street,
          city,
          country
        ) VALUES (
          $1,
          $2,
          $3
        ) RETURNING *
      )
      INSERT INTO users (
        email,
        name,
        password,
        address_id
      ) VALUES (
        $4,
        $5,
        $6,
        (SELECT id FROM created_address)
      ) RETURNING *
    `,
        [
          userData.address.street,
          userData.address.city,
          userData.address.country,
          userData.email,
          userData.name,
          userData.password,
        ],
      );
      return new UserModel(databaseResponse.rows[0]);
    } catch (error) {
      if (isRecord(error) && error.code === PostgresErrorCode.UniqueViolation) {
        throw new UserAlreadyExistsException(userData.email);
      }
      throw error;
    }
  }

  async getById(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `
        SELECT users.*,
          addresses.street AS address_street, addresses.city AS address_city, addresses.country AS address_country
          FROM users
          LEFT JOIN addresses ON users.address_id = addresses.id
          WHERE users.id=$1
      `,
      [id],
    );
    const entity = databaseResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return new UserModel(entity);
  }

  async createUser(userData: CreateUserDto) {
    try {
      const databaseResponse = await this.databaseService.runQuery(
        `
          INSERT INTO users (
            email,
            name,
            password
          ) VALUES (
            $1,
            $2,
            $3
          ) RETURNING *
        `,
        [userData.email, userData.name, userData.password],
      );
      return new UserModel(databaseResponse.rows[0]);
    } catch (error) {
      if (
        isDatabaseError(error) &&
        error.code === PostgresErrorCode.UniqueViolation
      ) {
        throw new UserAlreadyExistsException(userData.email);
      }
      throw error;
    }
  }

  async create(userData: CreateUserDto) {
    if (userData.address) {
      return this.createUserWithAddress(userData);
    }
    return this.createUser(userData);
  }
}

export default UsersRepository;
