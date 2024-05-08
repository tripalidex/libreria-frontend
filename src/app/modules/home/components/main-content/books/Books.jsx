import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, TextField, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'codigo', headerName: 'Código de Libro', width: 130 },
  { field: 'autor', headerName: 'Autor', width: 90 },
  { field: 'editorial', headerName: 'Editorial', width: 90 },
  { field: 'categoria', headerName: 'Categoría de Libro', width: 150 },
  { field: 'nombre', headerName: 'Nombre del Libro', width: 120 },
  { field: 'sinopsis', headerName: 'Sinopsis', width: 90 },
  { field: 'precio', headerName: 'Precio del libro', type: 'number', width: 120 },
  { field: 'stock', headerName: 'Stock', type: 'number', width: 90 },
  { field: 'estado', headerName: 'Estado del libro', width: 150 },
  { field: 'publicacion', headerName: 'Fecha de publicación', width: 150 },
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

function BookDataGrid() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Paper elevation={4} sx={{ p: 2, margin: 'auto', maxWidth: 1550, flexGrow: 1, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Libros en Venta
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button variant="contained" onClick={handleOpen} sx={{ mr: -100 }}>
          Agregar Libro
        </Button>
        <Button variant="contained" color="error">
          Eliminar Libro
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
          <TextField autoFocus margin="dense" id="codigo del libro" label="Codigo del libro" type="text" fullWidth variant="outlined" />
          <TextField autoFocus margin="dense" id="nombre" label="Nombre del Libro" type="text" fullWidth variant="outlined" />
          <TextField margin="dense" id="autor" label="Autor" type="text" fullWidth variant="outlined" />
          <TextField margin="dense" id="editorial" label="Editorial" type="text" fullWidth variant="outlined" />
          <TextField margin="dense" id="categoria" label="Categoria" type="text" fullWidth variant="outlined" />
          <TextField margin="dense" id="descripcion" label="Descripcion" type="text" fullWidth variant="outlined" />
          <TextField margin="dense" id="precio" label="Precio" type="text" fullWidth variant="outlined" />
          <TextField margin="dense" id="stock" label="Stock de producto" type="text" fullWidth variant="outlined" />
          <TextField margin="dense" id="fecha de publicacion" label="Fecha de publicacion" type="text" fullWidth variant="outlined" />
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

export default BookDataGrid;
