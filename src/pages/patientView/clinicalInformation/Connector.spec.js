import React from 'react';
import sinon from 'sinon';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import Immutable from 'seamless-immutable';
import { actionTypes, default as Connector, __RewireAPI__ } from './Connector';

describe('clinicalInformation connector', () => {

    describe('mapDispatchToProps',()=>{

        it('dispatches a load action with status equal to fetching',()=>{

            __RewireAPI__.__Rewire__('getClinicalInformationData',()=>{
                return new Promise((resolve)=>{
                   setTimeout(()=>resolve(),1);
                });
            });

            const dispatchStub = sinon.stub();

            Connector.mapDispatchToProps.loadClinicalInformationTableData()(dispatchStub);
            
            assert.equal(dispatchStub.args[0][0].status, "fetching");
            assert.equal(dispatchStub.args[0][0].type, actionTypes.FETCH);

            __RewireAPI__.__ResetDependency__('getClinicalInformationData');

        });
        
    });
    
    describe('reducer',()=>{
        
        it('handles fetching by setting status to fetching', ()=>{
           
            const newState = Connector.reducer(Immutable({}), { type: actionTypes.FETCH, status: 'fetching' })
            
            assert.equal(newState.status, 'fetching');

        });

    });
    
});
