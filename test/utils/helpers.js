import { expect } from 'chai';
import { buildRelationshipData } from '../../src/utils/helpers';

describe('Build relationship payloads', () => {
  it('should return an array of relationship key value pairings', () => {
    const relationships = buildRelationshipData('category', ['123', '456']);

    expect(relationships).to.deep.include.members([
      { type: 'category', id: '123' },
      { type: 'category', id: '456' },
    ]);
  });

  it('should return an empty array', () => {
    const relationships = buildRelationshipData('category', null);

    expect(relationships).to.be.an('array').that.is.empty;
  });
});
