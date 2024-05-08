import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, TextField, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nombres apellidos', headerName: 'Nombres y Apellidos', width: 150 },
  { field: 'fecha de nacimiento', headerName: 'Fecha de nacimiento', width: 150 },
  { field: 'nacionalidad', headerName: 'Nacionalidad', width: 130 },
  { field: 'estado', headerName: 'Estado', width: 800 },
  {
    field: 'acciones',
    headerName: 'Acciones',
    sortable: false,
    width: 160,
    renderCell: (params) => (
      <Box>
        <Button size="small" color="primary" onClick={() => alert('Editar ' + params.id)}>Editar</Button>
        <Button size="small" color="secondary" onClick={() => alert('Eliminar ' + params.id)}>Eliminar</Button>
      </Box>
    ),
  }
];

const rows = [
  { id: 1, codigo: '001', nombre: 'Libro A', autor: 'Autor A', sinopsis: 'Breve sinopsis del libro A', stock: 15 },
  // Agrega más libros según sea necesario
];

function Authors() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Paper elevation={4} sx={{ p: 2, margin: 'auto', maxWidth: 1550, flexGrow: 1, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Autores
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button variant="contained" onClick={handleOpen} sx={{ mr: -100 }}>
          Agregar autor
        </Button>
        <Button variant="contained" color="error">
          Eliminar autor
        </Button>
        <TextField
          label="Buscar..."
          variant="outlined"
          sx={{ width: '25%' }}
        />
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar autor</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" id="codigo del autor" label="Codigo del autor" type="text" fullWidth variant="outlined" />
          <TextField margin="dense" id="nombre apellidos" label="Nombre y apellidos" type="text" fullWidth variant="outlined" />
          <TextField margin="dense" id="nacionalidad" label="Nacionalidad" type="text" fullWidth variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default Authors