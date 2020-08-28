import React from 'react';
import { useEffect, useState } from 'react';
import { Table, InputGroup, FormControl, Button } from 'react-bootstrap';
import Icon from '../Icon/index.js';

const EditTractOwnership = ({ value = [], onChange = () => {} }) => {
  const [tablerows, updateTableRows] = useState([]);

  //useEffect hook to use the updateTableRows func to update tablerows
  useEffect(() => {
    value.map((tractOwnerships, index) => {
      let newRow = (
        <tr
          data-testid={`mineralInterest-${tractOwnerships.id}`}
          key={tractOwnerships.id}
        >
          <td id={`mineralInterest-${tractOwnerships.id}`}>
            <InputGroup className="owner">
              <FormControl placeholder={tractOwnerships.owner} />
            </InputGroup>
          </td>
          <td key={`mineralInterest-${tractOwnerships.id}`}>
            <InputGroup>
              <FormControl placeholder={tractOwnerships.interest} />
              <InputGroup.Append>
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </td>
          <td id={`mineralinterest-${tractOwnerships.id}`}>
            {value[index].npris
              ? value[index].npris.map((el) => (
                  <tr data-testid={`npri-${el.id}`}>{el.owner} </tr>
                ))
              : console.log('undefined')}
          </td>
          <td id={`mineralinterest-${tractOwnerships.id}`}>
            <InputGroup className="lease">
              <FormControl placeholder={tractOwnerships.lease} />
            </InputGroup>
          </td>
          <td>
            <Icon icon={'remove'} />
          </td>
        </tr>
      );
      updateTableRows((rows) => [...rows, newRow]);
    });
  }, []);

  const addRow = (e) => {
    let newRow = (
      <tr data-testid={`mineralInterest-`}>
        <td id={`mineralInterest-`}>
          <InputGroup className="owner">
            <FormControl placeholder={'add a mineral interest owner'} />
          </InputGroup>
        </td>
        <td key={`mineralInterest-`}>
          <InputGroup>
            <FormControl placeholder={'add an interest value'} />
            <InputGroup.Append>
              <InputGroup.Text>%</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </td>
        <td id={`mineralinterest-`}>
          <tr data-testid={`npri-`}>{'add NPRI'} </tr>
        </td>
        <td id={`mineralinterest-`}>
          <InputGroup className="lease">
            <FormControl placeholder={'add a lease name'} />
          </InputGroup>
        </td>
        <td>
          <Icon icon={'remove'} />
        </td>
      </tr>
    );
    updateTableRows((rows) => [...rows, newRow]);
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
          <tbody>{tablerows.map((row) => row)}</tbody>
        </Table>
      </div>
      <div>
        <Button variant="light">
          {' '}
          <Icon icon={'add'} /> Add NPRI{' '}
        </Button>
      </div>
      <div>
        <Button variant="light" onClick={addRow} onChange={updateTableRows}>
          {' '}
          <Icon icon={'add'} /> Add Mineral Interest{' '}
        </Button>
      </div>
    </div>
  );
};

export default EditTractOwnership;
