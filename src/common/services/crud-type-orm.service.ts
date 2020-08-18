import { Repository } from 'typeorm'

export abstract class CrudTypeOrmService<Entity> {
  protected constructor(protected repository: Repository<Entity>) {}

  public get findOne(): Repository<Entity>['findOne'] {
    return this.repository.findOne.bind(this.repository)
  }

  public get find(): Repository<Entity>['find'] {
    return this.repository.find.bind(this.repository)
  }

  public get save(): Repository<Entity>['save'] {
    return this.repository.save.bind(this.repository)
  }

  public get delete(): Repository<Entity>['delete'] {
    return this.repository.delete.bind(this.repository)
  }
}
