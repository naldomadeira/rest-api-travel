import CategoryAgent from '../models/CategoryAgent';
import Agent from '../models/Agent';
import { NotFound } from '../../errors';

const relationships = {
    attributes: ['id', 'name', 'address', 'active', 'category_agent_id'],
    include: {
        model: CategoryAgent,
        as: 'category',
        attributes: ['id', 'name', 'profit'],
    },
};

class AgentBusiness {
    constructor() {
        this.relationships = {
            attributes: [
                'id',
                'name',
                'address',
                'active',
                'category_agent_id',
            ],
            include: {
                model: CategoryAgent,
                as: 'category',
                attributes: ['id', 'name', 'profit'],
            },
        };
    }

    index() {
        return Agent.findAll(relationships);
    }

    store(agentDocument) {
        return Agent.create(agentDocument);
    }

    async show(agentId) {
        const agentSearched = await this.findOrFail(agentId, relationships);

        return agentSearched;
    }

    async update(agentId, agentDocument) {
        const agentSearched = await this.findOrFail(agentId);

        return agentSearched.update(agentDocument);
    }

    async destroy(agentId) {
        const agentSearched = await this.findOrFail(agentId);

        await agentSearched.destroy();
    }

    async findOrFail(agentId, relationships = null) {
        const agentSearched = await Agent.findByPk(agentId, relationships);

        if (agentSearched) {
            return agentSearched;
        }

        throw new NotFound(`agent doesn't exist`);
    }

    getRelationships() {
        return this.relationships;
    }
}

export default new AgentBusiness();
