import { MigrationInterface, QueryRunner } from 'typeorm'

export class createTablesForAuthentication1597678278154
  implements MigrationInterface {
  name = 'createTablesForAuthentication1597678278154'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "roles" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "key" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "icon" character varying, CONSTRAINT "UQ_a87cf0659c3ac379b339acf36a2" UNIQUE ("key"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))',
    )
    await queryRunner.query(
      'CREATE TABLE "roles-permissions" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "permission" character varying NOT NULL, "description" character varying, "role" integer, CONSTRAINT "PK_458947c5f3b205264dc26445a4c" PRIMARY KEY ("id"))',
    )
    await queryRunner.query(
      'CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "username" character varying NOT NULL, "password" character varying, "salt" character varying, "email" character varying, "display_name" character varying NOT NULL DEFAULT \'\', "is_active" boolean NOT NULL DEFAULT true, "is_admin" boolean NOT NULL DEFAULT false, "is_staff" boolean NOT NULL DEFAULT false, "created_by" integer, "updated_by" integer, "deleted_by" integer, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "REL_f32b1cb14a9920477bcfd63df2" UNIQUE ("created_by"), CONSTRAINT "REL_b75c92ef36f432fe68ec300a7d" UNIQUE ("updated_by"), CONSTRAINT "REL_021e2c9d9dca9f0885e8d73832" UNIQUE ("deleted_by"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))',
    )
    await queryRunner.query(
      'CREATE TABLE "users_roles_roles" ("usersId" integer NOT NULL, "rolesId" integer NOT NULL, CONSTRAINT "PK_6c1a055682c229f5a865f2080c1" PRIMARY KEY ("usersId", "rolesId"))',
    )
    await queryRunner.query(
      'CREATE INDEX "IDX_df951a64f09865171d2d7a502b" ON "users_roles_roles" ("usersId") ',
    )
    await queryRunner.query(
      'CREATE INDEX "IDX_b2f0366aa9349789527e0c36d9" ON "users_roles_roles" ("rolesId") ',
    )
    await queryRunner.query(
      'ALTER TABLE "roles-permissions" ADD CONSTRAINT "FK_20f8e6c8f26dd4e7c657b488535" FOREIGN KEY ("role") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    )
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "FK_f32b1cb14a9920477bcfd63df2c" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "FK_b75c92ef36f432fe68ec300a7d4" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "FK_021e2c9d9dca9f0885e8d738326" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
    await queryRunner.query(
      'ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_df951a64f09865171d2d7a502b1" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    )
    await queryRunner.query(
      'ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_b2f0366aa9349789527e0c36d97" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_b2f0366aa9349789527e0c36d97"',
    )
    await queryRunner.query(
      'ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_df951a64f09865171d2d7a502b1"',
    )
    await queryRunner.query(
      'ALTER TABLE "users" DROP CONSTRAINT "FK_021e2c9d9dca9f0885e8d738326"',
    )
    await queryRunner.query(
      'ALTER TABLE "users" DROP CONSTRAINT "FK_b75c92ef36f432fe68ec300a7d4"',
    )
    await queryRunner.query(
      'ALTER TABLE "users" DROP CONSTRAINT "FK_f32b1cb14a9920477bcfd63df2c"',
    )
    await queryRunner.query(
      'ALTER TABLE "roles-permissions" DROP CONSTRAINT "FK_20f8e6c8f26dd4e7c657b488535"',
    )
    await queryRunner.query('DROP INDEX "IDX_b2f0366aa9349789527e0c36d9"')
    await queryRunner.query('DROP INDEX "IDX_df951a64f09865171d2d7a502b"')
    await queryRunner.query('DROP TABLE "users_roles_roles"')
    await queryRunner.query('DROP TABLE "users"')
    await queryRunner.query('DROP TABLE "roles-permissions"')
    await queryRunner.query('DROP TABLE "roles"')
  }
}
