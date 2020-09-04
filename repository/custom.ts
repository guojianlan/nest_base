import { EntityRepository, Repository, ObjectID, FindManyOptions, Not, MoreThan, Equal, FindOneOptions, FindConditions } from 'typeorm'
import { merge } from 'lodash'
export class CustomRepository<T> extends Repository<T>{
    customSave(entity) {
        let time = parseInt((+new Date()) / 1000 + '', 10)
        if (!entity.create_at) {
            entity.create_at = time
            entity.update_at = time
        }
        if (entity.update_at) {
            entity.update_at = time
        }
        return this.save<T>(entity);
    }
    customSoftDelete(entity): Promise<T> {
        let time = parseInt((+new Date()) / 1000 + '', 10)
        entity.update_at = time
        entity.delete_at = time
        return this.save(entity)
    }
    customFindOne(id?: string | number | Date | ObjectID, options?: FindOneOptions<T>) {
        if (options == undefined) {
            options = {}
        }
        options = merge(options, {
            where: {
                delete_at: Equal(0)
            }
        })
        return this.findOne(id, options)

    }
    customReStore(criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<T>) {
        let time = parseInt((+new Date()) / 1000 + '', 10)
        let updateAt: any = {
            delete_at: 0,
            update_at: time
        }
        return this.update(criteria, updateAt)
    }
    customDelete(criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[]) {
        this.update
        let time = parseInt((+new Date()) / 1000 + '', 10)
        let updateAt: any = {
            delete_at: time,
            update_at: time
        }
        return this.update(criteria, updateAt)
    }
    customFind(options?: FindManyOptions<T>) {
        if (options == undefined) {
            options = {}
        }
        options = merge(options, {
            where: {
                delete_at: Equal(0)
            }
        })
        return this.find(options)
    }
    customFindAndCount(options?: FindManyOptions<T>) {
        if (options == undefined) {
            options = {}
        }
        options = merge(options, {
            where: {
                delete_at: Equal(0)
            }
        })

        return this.findAndCount(options)
    }
}