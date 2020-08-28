import React from 'react';
import { Table, InputGroup, FormControl, Button } from 'react-bootstrap';
import Icon from '../Icon/index.js';

const EditTractOwnership = ({ value = [], onChange = () => {} }) => {
  console.log(value);
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
          <tbody>
            {value.map((tractOwnerships) => (
              <tr key={`mineralInterest-${tractOwnerships.id}`}>
                <td id={`mineralInterest-${tractOwnerships.id}`}>
                  <InputGroup className="owner">
                    <FormControl placeholder={tractOwnerships.owner} />
                  </InputGroup>
                </td>
                <td key={`mineralInterest-${tractOwnerships.id}`}>
                  <InputGroup className="interest" id={tractOwnerships.id}>
                    <FormControl placeholder={tractOwnerships.interest} />
                    <InputGroup.Append>
                      <InputGroup.Text>%</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </td>
                <td id={`mineralinterest-${tractOwnerships.id}`}></td>
                <td id={`mineralinterest-${tractOwnerships.id}`}>
                  <InputGroup className="lease">
                    <FormControl placeholder={tractOwnerships.lease} />
                  </InputGroup>
                </td>
                <td>
                  <Icon icon={'remove'} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div>
        <Button variant="light">
          {' '}
          <Icon icon={'add'} /> Add NPRI{' '}
        </Button>
      </div>
      <div>
        <Button variant="light">
          {' '}
          <Icon icon={'add'} /> Add Mineral Interest{' '}
        </Button>
      </div>
    </div>
  );
};

export default EditTractOwnership;
