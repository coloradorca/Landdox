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
          <td></td>
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

      if (tractOwnerships.npris) {
        tractOwnerships.npris.map((npri) => {
          const npriRow = (
            <tr data-testid={`mineralInterest-${npri.id}`} key={index}>
              <td id={`mineralInterest-${npri.id}`}>
                <InputGroup className="owner">
                  <Icon icon={'indent'} />
                  {'  '}
                  <FormControl name="npriOwner" placeholder={npri.owner} />
                </InputGroup>
              </td>
              <td></td>
              <td id={`mineralInterest-${npri.id}`}>
                <InputGroup>
                  <FormControl placeholder={npri.interest} />
                  <InputGroup.Append>
                    <InputGroup.Text>%</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </td>
              <td></td>
              <td>
                <div>
                  <Button variant="light" onClick={() => removeRow(index)}>
                    <Icon icon={'remove'} />
                  </Button>
                </div>
              </td>
            </tr>
          );
          updateTableRows((rows) => [...rows, npriRow]);
        });
      }
    });
  }, [tracts]);

  const addMineralInterest = (row) => {
    let newRow = (
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
          <tr data-testid={`npri-`}></tr>
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
    );
    updateTableRows((rows) => [...rows, newRow]);
  };

  const addNpri = (row) => {
    const npriRow = (
      <tr data-testid={`mineralInterest-$`}>
        <td id={`mineralInterest-`}>
          <InputGroup className="owner">
            <Icon icon={'indent'} />
            {'  '}
            <FormControl name="npriOwner" placeholder="add Owner" />
          </InputGroup>
        </td>
        <td></td>
        <td id={`mineralInterest-`}>
          <InputGroup>
            <FormControl placeholder="add Interest" />
            <InputGroup.Append>
              <InputGroup.Text>%</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </td>
        <td></td>
        <td>
          <div>
            <Button variant="light" onClick={removeRow}>
              <Icon icon={'remove'} />
            </Button>
          </div>
        </td>
      </tr>
    );
    updateTableRows((rows) => [...rows, npriRow]);
  };

  //call the onChange prop to pass the tests
  // const handleInputChange = (event) => {
  //   const
  // }

  //function to delete mineral Interest
  const removeRow = (id) => {
    const del = tracts.filter((row) => row.index !== id);
    console.log(del);
    updateTableRows(del);
  };

  return tablerows ? (
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
        <Button variant="light" onClick={addNpri}>
          <Icon icon={'add'} />
          {'  '}
          Add NPRI
        </Button>
      </div>
      <div>
        <Button
          variant="light"
          onClick={addMineralInterest}
          onChange={onChange}
        >
          <Icon icon={'add'} />
          {'  '}
          Add Mineral Interest
        </Button>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default EditTractOwnership;
