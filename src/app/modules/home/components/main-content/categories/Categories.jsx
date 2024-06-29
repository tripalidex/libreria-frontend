import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, TextField, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'categoria', headerName: 'Categoria', width: 200 },
  { field: 'descripcion', headerName: 'Descripcion', width: 1000 },
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

function Categories() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Paper elevation={4} sx={{ p: 2, margin: 'auto', maxWidth: 1550, flexGrow: 1, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
      Categorias
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button variant="contained" onClick={handleOpen} sx={{ mr: -90 }}>
          Agregar Categoria
        </Button>
        <Button variant="contained" color="error">
          Eliminar Categoria
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
        <DialogTitle>Agregar Libro</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" id="id" label="Codigo categoria" type="text" fullWidth variant="outlined" />
          <TextField margin="dense" id="categoria" label="Categoria" type="text" fullWidth variant="outlined" />
          <TextField margin="dense" id="descripcion" label="Descripcion" type="text" fullWidth variant="outlined" />
          {/* Agrega más campos según sea necesario */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default Categories