import React from 'react';
import { useReducer } from 'react';
import { Table, InputGroup, FormControl, Button, Form } from 'react-bootstrap';
import Icon from '../Icon/index.js';

const EditTractOwnership = ({ value = [], onChange = () => {} }) => {
  const [tracts, dispatch] = useReducer(reducer, value);

  function reducer(state, action) {
    switch (action.type) {
      case 'owner':
        let updatedTracts = [...state];
        updatedTracts[action.index] = {
          ...updatedTracts[action.index],
          [action.field]: action.value,
        };
        return updatedTracts;
      case 'npri':
        console.log(action);
        let updatedNpri = [...state];
        updatedNpri[action.ownerIndex].npris[action.npriIndex] = {
          ...updatedNpri[action.ownerIndex].npris[action.npriIndex],
          [action.npriField]: action.npriFieldValue,
        };
        return updatedNpri;
      case 'addMin':
        let addNewMineralInterest = [...state];
        addNewMineralInterest[state.length] = {
          index: state.length,
          owner: 'add an owner',
          interest: 'add interest',
          lease: 'add lease',
          npris: [],
        };
        return addNewMineralInterest;
      case 'addNpri':
        let addNewNpri = [...state];
        addNewNpri[state.length - 1].npris[
          addNewNpri[state.length - 1].npris.length
        ] = {
          id: '',
          interest: 'add interest',
          owner: 'add an owner',
        };
        console.log(addNewNpri[state.length - 1].npris);
        return addNewNpri;
      case 'removeMineralInterst':
        let removedMineralInterest = [...state];
        return removedMineralInterest.filter(
          (el, id) => el.owner !== action.owner
        );
      case 'removeNpri':
        let removedNpri = [...state];
        // console.log(removedNpri[action.customerIndex].npris);
        // return removedNpri[action.customerIndex].npris.filter(
        //   (el, id) => id !== action.index
        // );
        return removedNpri;
      default:
        throw new Error();
    }
  }
  const addMineralInterest = (e) => {
    dispatch({
      type: 'addMin',
    });
  };
  const addNpri = (e) => {
    dispatch({
      type: 'addNpri',
    });
  };
  const removeMineralInterest = (index, e, owner) => {
    dispatch({
      type: 'removeMineralInterst',
      index: index,
      owner: owner,
    });
  };

  const removeNpri = (customerIndex, npriOwner, npriIndex, e) => {
    dispatch({
      type: 'removeNpri',
      index: npriIndex,
      npriOwner: npriOwner,
      customerIndex: customerIndex,
    });
  };

  const handleOwnerChange = (e) => {
    dispatch({
      type: 'owner',
      field: e.target.name,
      index: e.target.id,
      value: e.target.value,
    });
  };
  const handleNpriChange = (customerIndex, e) => {
    dispatch({
      type: 'npri',
      ownerIndex: customerIndex,
      npriIndex: e.target.id,
      npriField: e.target.name,
      npriFieldFalue: e.target.value,
    });
  };
  const renderRows = (tracts) => {
    return tracts.map((tractOwnerships, index) => {
      return (
        <>
          <tr data-testid={`mineralInterest-${tractOwnerships.id}`} key={index}>
            <td id={`mineralInterest-${tractOwnerships.id}`}>
              <Form.Group controlId={index}>
                <InputGroup id={index} className="owner">
                  <FormControl
                    name="owner"
                    value={tractOwnerships.owner}
                    onChange={handleOwnerChange}
                    type="text"
                  />
                </InputGroup>
              </Form.Group>
            </td>
            <td id={`mineralInterest-${tractOwnerships.id}`}>
              <Form.Group controlId={index}>
                <InputGroup>
                  <FormControl
                    name="interest"
                    value={tractOwnerships.interest}
                    onChange={handleOwnerChange}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>%</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
            </td>
            <td></td>
            <td id={`mineralinterest-${tractOwnerships.id}`}>
              <Form.Group controlId={index}>
                <InputGroup className="lease">
                  <FormControl
                    name="lease"
                    value={tractOwnerships.lease}
                    onChange={handleOwnerChange}
                  />
                </InputGroup>
              </Form.Group>
            </td>
            <td>
              <div>
                <Button
                  variant="light"
                  onClick={(e) =>
                    removeMineralInterest(index, e, tractOwnerships.owner)
                  }
                >
                  <Icon icon={'remove'} />
                </Button>
              </div>
            </td>
          </tr>
          {renderNpris(tractOwnerships.npris, index)}
        </>
      );
    });
  };
  const renderNpris = (npris, customerIndex) => {
    return npris.map((npri, npriIndex) => {
      return (
        <tr data-testid={`mineralInterest-${npri.id}`} key={npri.id}>
          <td id={`mineralInterest-${npri.id}`}>
            <Form.Group controlId={npriIndex}>
              <InputGroup id={npriIndex} className="owner">
                <Icon icon={'indent'} />
                <FormControl
                  name="owner"
                  value={tracts[customerIndex].npris[npriIndex].owner}
                  onChange={(e) => handleNpriChange(customerIndex, e)}
                  type="text"
                />
              </InputGroup>
            </Form.Group>
          </td>
          <td></td>
          <td id={`mineralInterest-${npri.id}`}>
            <Form.Group controlId={npriIndex}>
              <InputGroup>
                <FormControl
                  name="interest"
                  value={tracts[customerIndex].npris[npriIndex].interest}
                  onChange={(e) => handleNpriChange(customerIndex, e)}
                  type="text"
                />
                <InputGroup.Append>
                  <InputGroup.Text>%</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </td>
          <td></td>
          <td>
            <div>
              <Button
                variant="light"
                onClick={(e) =>
                  removeNpri(customerIndex, npri.owner, npriIndex, e)
                }
              >
                <Icon icon={'remove'} />
              </Button>
            </div>
          </td>
        </tr>
      );
    });
  };
  return (
    <div>
      <div>
        <Table hover>
          <thead>
            <tr>
              <th>Owner</th>
              <th>Mineral Interest</th>
              <th>NPRI</th>
              <th>Lease</th>
            </tr>
          </thead>
          <tbody>{renderRows(tracts)}</tbody>
        </Table>
      </div>
      <div>
        <Button variant="light" onClick={addNpri}>
          <Icon icon={'add'} />
          {'  '}
          Add NPRI
        </Button>
      </div>
      <div>
        <Button variant="light" onClick={addMineralInterest}>
          <Icon icon={'add'} />
          {'  '}
          Add Mineral Interest
        </Button>
      </div>
    </div>
  );
};
export default EditTractOwnership;
