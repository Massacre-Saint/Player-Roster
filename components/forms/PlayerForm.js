import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createPlayer, updatePlayer } from '../../api/playerData';
import { useAuth } from '../../utils/context/authContext';
import { getTeams } from '../../api/teamData';
import { getRanks } from '../../api/rankData';
import getImages from '../../api/imageData';

const intitialState = {
  gamertag: '',
  image: '',
  rank: '',
  teamId: '',
};

export default function PlayerForm({ obj }) {
  const [formInput, setFormInput] = useState(intitialState);
  const [teams, setTeams] = useState([]);
  const [ranks, setRanks] = useState([]);

  const [images, setImages] = useState('');
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    getTeams(user.uid).then(setTeams);
    getRanks().then(setRanks);
    getImages().then((array) => {
      setImages(array[Math.floor(Math.random() * 13)]);
    });
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePlayer(formInput)
        .then(() => router.push('/players'));
    } else {
      const payload = { ...formInput, uid: user.uid, image: images.image };
      createPlayer(payload).then(() => {
        router.push('/players');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Player</h2>
      <FloatingLabel controlId="floatingInput1" label="Gamertag" className="mb-3">
        <Form.Control type="text" placeholder="Gamertag" name="gamertag" value={formInput.gamertag} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="Rank">
        <Form.Select
          aria-label="Rank"
          name="rank"
          value={formInput.rank}
          onChange={handleChange}
          className="mb-3"
          required
        >
          <option value="">Choose your rank.</option>
          {
            ranks.map((rank) => (
              <option
                key={rank.firebaseKey}
                value={rank.firebaseKey}
              >
                {rank.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="Team">
        <Form.Select
          aria-label="Team"
          name="teamId"
          value={formInput.teamId}
          onChange={handleChange}
          className="mb-3"
          required
        >
          <option value="">Choose your team.</option>
          {
            teams.map((team) => (
              <option
                key={team.firebaseKey}
                value={team.firebaseKey}
              >
                {team.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Player</Button>
    </Form>
  );
}

PlayerForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    gamertag: PropTypes.string,
    rank: PropTypes.string,
    image: PropTypes.string,
    teamId: PropTypes.string,
  }),
};

PlayerForm.defaultProps = {
  obj: intitialState,
};
