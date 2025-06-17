import { useState } from 'react';
// import Button from '@mui/material/Button';
import {Delete , Edit} from '@mui/icons-material';
import { Button , Box , TextField , List , ListItem , ListItemText , IconButton } from '@mui/material';

function PizzaList({ name, data, onCreate, onUpdate, onDelete, error }) {
  const [formData, setFormData] = useState({ id: '', name: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingId) {
      onUpdate(formData);
      setEditingId(null);
    } else {
      onCreate(formData);
    }
    setFormData({ id: '', name: '', description: '' });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      id: item.id,
      name: item.name,
      description: item.description,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ id: '', name: '', description: '' });
  };


  return (
    //sx={{ padding: 2 , border: '1px solid #ccc', borderRadius: 2, backgroundColor: '#f9f9f9' }}
    <Box component="section" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>New {name}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8}}>
        <TextField 
          name="name" 
          label="name" 
          value={formData.name}
          onChange={handleFormChange}
          variant='outlined'
          />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleFormChange}
          variant='outlined'
        />
        <Button sx={{ mr: 1 }} variant="contained" type="submit">
          {editingId ? 'Update' : 'Create'}
        </Button>
        {
          editingId 
            && 
            <Button variant='contained' color="secondary" onClick={handleCancelEdit}>
              Cancel
            </Button>
        }
      </form>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {data.map(item => (
          <ListItem key={item.id} secondaryAction={
            <>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete"  onClick={() => onDelete(item.id)}>
                <Delete />
              </IconButton>
            </>
          }>
            <ListItemText primary={item.name} secondary={item.description} />
          </ListItem>
        ))}
      </List>
      {error && <p>{error}</p>}
    </Box>

    /*
    <div>
      <form onSubmit={handleSubmit}>

          <li key={item.id}>
            <div><button>Edit</button>
            <button>Delete</button></div>
          </li>
      
      </form>
      
      <h2>{name}s</h2>
      <ul>
      </ul>
    </div>
    */
  );
}

export default PizzaList;