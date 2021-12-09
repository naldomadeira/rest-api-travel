import CategoryAgent from '../models/CategoryAgent';
import Agent from '../models/Agent';
import { NotFound } from '../../errors';

class CategoryAgentBusiness {
    constructor() {
        this.relationships = {
            attributes: ['id', 'name', 'profit', 'active'],
            include: [
                {
                    model: Agent,
                    as: 'agents',
                    attributes: ['id', 'name'],
                },
            ],
        };
    }

    index() {
        return CategoryAgent.findAll(this.relationships);
    }

    store(categoryAgentDocument) {
        return CategoryAgent.create(categoryAgentDocument);
    }

    async show(categoryAgentId) {
        const categorySearched = await this.findOrFail(
            categoryAgentId,
            this.relationships
        );

        return categorySearched;
    }

    async update(categoryAgentId, categoryAgentDocument) {
        const categorySearched = await this.findOrFail(categoryAgentId);

        return categorySearched.update(categoryAgentDocument);
    }

    async destroy(categoryAgentId) {
        const categorySearched = await this.findOrFail(categoryAgentId);

        await categorySearched.destroy();
    }

    async findOrFail(categoryAgentId, relationships = null) {
        const categorySearched = await CategoryAgent.findByPk(
            categoryAgentId,
            relationships
        );

        if (categorySearched) {
            return categorySearched;
        }

        throw new NotFound(`category of the agent doesn't exist`);
    }

    getRelationships() {
        return this.relationships;
    }
}

export default new CategoryAgentBusiness();
