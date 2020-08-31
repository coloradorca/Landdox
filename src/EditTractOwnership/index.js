import React from 'react';
import { useEffect, useState } from 'react';
import { Table, InputGroup, FormControl, Button } from 'react-bootstrap';
import Icon from '../Icon/index.js';

const EditTractOwnership = ({ value = [], onChange = () => {} }) => {
  //have two states, one to render the rows, the other to keep track of tracts
  const [tracts, updateTracts] = useState([]);
  const [tablerows, updateTableRows] = useState([]);

  //set up the initial state from value prop
  useEffect(() => {
    value.map((tract, index) => {
      const eachTract = {
        index: index,
        id: tract.id,
        owner: tract.owner,
        interest: tract.interest,
        lease: tract.lease,
        npris: tract.npris,
      };
      updateTracts((item) => [...item, eachTract]);
    });
  }, []);

  //useEffect hook to use the updateTableRows function to update the tablerows
  useEffect(() => {
    tracts.map((tractOwnerships, index) => {
      let newRow = (
        <tr data-testid={`mineralInterest-${tractOwnerships.id}`} key={index}>
          <td id={`mineralInterest-${tractOwnerships.id}`}>
            <InputGroup className="owner">
              <FormControl placeholder={tractOwnerships.owner} />
            </InputGroup>
          </td>
          <td id={`mineralInterest-${tractOwnerships.id}`}>
            <InputGroup>
              <FormControl placeholder={tractOwnerships.interest} />
              <InputGroup.Append>
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </td>
          <td id={`mineralinterest-${tractOwnerships.id}`}>
            {value[index].npris ? (
              value[index].npris.map((el) => (
                <td data-testid={`npri-${el.id}`} key={el.id}>
                  {el.owner}
                </td>
              ))
            ) : (
              <td> </td>
            )}
          </td>
          <td id={`mineralinterest-${tractOwnerships.id}`}>
            <InputGroup className="lease">
              <FormControl placeholder={tractOwnerships.lease} />
            </InputGroup>
          </td>
          <td>
            <div>
              <Button variant="light" onClick={() => removeRow(index)}>
                <Icon icon={'remove'} />
              </Button>
            </div>
          </td>
        </tr>
      );
      updateTableRows((rows) => [...rows, newRow]);
    });
  }, [tracts]);

  const addRow = (row) => {
    let newRow = (
      <div>
        <tr data-testid={`mineralInterest-`}>
          <td id={`mineralInterest-`}>
            <InputGroup className="owner">
              <FormControl placeholder={'add a mineral interest owner'} />
            </InputGroup>
          </td>
          <td key={`mineralInterestValue`}>
            <InputGroup>
              <FormControl placeholder={'add an interest value'} />
              <InputGroup.Append>
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </td>
          <td key={`npri`}>
            <tr data-testid={`npri-`}>{'add NPRI'} </tr>
          </td>
          <td key={`lease`}>
            <InputGroup className="lease">
              <FormControl placeholder={'add a lease name'} />
            </InputGroup>
          </td>
          <td>
            <div>
              <Button variant="light" onClick={() => removeRow()}>
                <Icon icon={'remove'} />
              </Button>
            </div>
          </td>
        </tr>
      </div>
    );
    updateTableRows((rows) => [...rows, newRow]);
  };

  //call the onChange prop to pass the tests
  // const handleInputChange = (event) => {
  //   const
  // }

  //function to delete tracts
  const removeRow = (id) => {
    const del = tracts.filter((row) => row.index !== id);
    console.log(del);

    updateTableRows(del);
  };

  return (
    <div>
      <div>
        <Table hover onChange={updateTableRows}>
          <thead>
            <tr>
              <th>Owner</th>
              <th>Mineral Interest</th>
              <th>NPRI</th>
              <th>Lease</th>
            </tr>
          </thead>
          <tbody>{tablerows.map((row) => row)}</tbody>
        </Table>
      </div>
      <div>
        <Button variant="light">
          <Icon icon={'add'} />
          Add NPRI
        </Button>
      </div>
      <div>
        <Button variant="light" onClick={addRow} onChange={onChange}>
          <Icon icon={'add'} />
          Add Mineral Interest
        </Button>
      </div>
    </div>
  );
};

export default EditTractOwnership;
