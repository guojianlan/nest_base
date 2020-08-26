import { EntityRepository, Repository, ObjectID, FindManyOptions, Not, MoreThan, Equal } from 'typeorm'
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

}