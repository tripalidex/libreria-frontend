import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Grid, TextField } from '@mui/material';
import useAxiosPrivate from '../../../../../../hooks/useAxiosPrivate'; // Ajusta esta ruta según tu estructura

function Autores() {
    const [autores, setAutores] = useState([]);
    const [editData, setEditData] = useState(null);
    const [isEditOpen, setEditOpen] = useState(false);
    const [isAddOpen, setAddOpen] = useState(false);
    const [newData, setNewData] = useState({ nombre: '', apellido: '', fecha_nacimiento: '', nacionalidad: '', estado: '' });
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const [deleteData, setDeleteData] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    const getAutores = async () => {
        try {
            const response = await axiosPrivate.get('/autores');
            console.log("Datos obtenidos del servidor:", response.data);
            setAutores(response.data.map((item) => ({
                id: item.id_autor,
                nombre: item.nombre,
                apellido: item.apellido,
                fecha_nacimiento: item.fecha_nacimiento,
                nacionalidad: item.nacionalidad,
                estado: item.estado ? 'Activo' : 'Inactivo',
            })));
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    const addAutor = async (newData) => {
        try {
            const response = await axiosPrivate.post('/autores', newData);
            getAutores();
            return response.data;
        } catch (error) {
            console.error("Error al agregar el autor:", error);
        }
    };

    const editAutor = async (id, updatedData) => {
        try {
            const response = await axiosPrivate.put(`/autores/${id}`, updatedData);
            console.log("Datos enviados al servidor para editar:", updatedData);
            getAutores();
            return response.data;
        } catch (error) {
            console.error("Error al editar el autor:", error);
        }
    };

    const deleteAutor = async (id) => {
        try {
            const response = await axiosPrivate.patch(`/autores/${id}`);
            getAutores();
            return response.data;
        } catch (error) {
            console.error("Error al eliminar el autor:", error);
        }
    };

    useEffect(() => {
        getAutores();
    }, []);

    const handleEditOpen = (row) => {
        setEditData({ ...row, estado: row.estado === 'Activo' ? true : false });
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
        setEditData(null);
    };

    const handleEditSave = async () => {
        try {
            const updatedData = {
                nombre: editData.nombre,
                apellido: editData.apellido,
                fecha_nacimiento: editData.fecha_nacimiento,
                nacionalidad: editData.nacionalidad,
                estado: editData.estado,
            };
            await editAutor(editData.id, updatedData);
            handleEditClose();
        } catch (error) {
            console.error("Error al guardar el autor:", error);
        }
    };

    const handleAddOpen = () => {
        setAddOpen(true);
    };

    const handleAddClose = () => {
        setAddOpen(false);
        setNewData({ nombre: '', apellido: '', fecha_nacimiento: '', nacionalidad: '', estado: '' });
    };

    const handleAddSave = async () => {
        try {
            await addAutor(newData);
            handleAddClose();
        } catch (error) {
            console.error("Error al agregar el autor:", error);
        }
    };

    const handleDeleteOpen = (row) => {
        setDeleteData(row);
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
        setDeleteData(null);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteAutor(deleteData.id);
            handleDeleteClose();
        } catch (error) {
            console.error("Error al eliminar el autor:", error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 120 },
        { field: 'nombre', headerName: 'Nombre', width: 200 },
        { field: 'apellido', headerName: 'Apellido', width: 200 },
        { field: 'fecha_nacimiento', headerName: 'Fecha de Nacimiento', width: 180 },
        { field: 'nacionalidad', headerName: 'Nacionalidad', width: 180 },
        { field: 'estado', headerName: 'Estado', width: 120 },
        {
            field: 'acciones',
            headerName: 'Acciones',
            sortable: false,
            width: 160,
            renderCell: (params) => (
                <Box>
                    <Button size="small" color="primary" onClick={() => handleEditOpen(params.row)}>Editar</Button>
                    <Button size="small" color="secondary" onClick={() => handleDeleteOpen(params.row)}>Eliminar</Button>
                </Box>
            ),
        },
    ];

    return (
        <Paper elevation={4} sx={{ p: 2, margin: 'auto', maxWidth: '100%', flexGrow: 1, backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                Autores
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
                <Grid item xs={12} md={4}>
                    <Button variant="contained" onClick={handleAddOpen} fullWidth>
                        Agregar Autor
                    </Button>
                </Grid>
            </Grid>
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <Box sx={{ minWidth: 650 }}>
                    <DataGrid
                        rows={autores}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                        autoHeight
                        sx={{
                            boxShadow: 2,
                            border: 2,
                            borderColor: 'primary.light',
                            '& .MuiDataGrid-cell:hover': {
                                color: 'primary.main',
                            },
                        }}
                    />
                </Box>
            </Box>
            <Dialog open={isEditOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
                <DialogTitle>Editar Autor</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nombre"
                        type="text"
                        fullWidth
                        value={editData?.nombre || ''}
                        onChange={(e) => setEditData({ ...editData, nombre: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Apellido"
                        type="text"
                        fullWidth
                        value={editData?.apellido || ''}
                        onChange={(e) => setEditData({ ...editData, apellido: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Fecha de Nacimiento"
                        type="date"
                        fullWidth
                        value={editData?.fecha_nacimiento || ''}
                        onChange={(e) => setEditData({ ...editData, fecha_nacimiento: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Nacionalidad"
                        type="text"
                        fullWidth
                        value={editData?.nacionalidad || ''}
                        onChange={(e) => setEditData({ ...editData, nacionalidad: e.target.value })}
                    />
                    <TextField
                        select
                        margin="dense"
                        label="Estado"
                        fullWidth
                        value={editData?.estado ? 1 : 0}
                        onChange={(e) => setEditData({ ...editData, estado: e.target.value === 1 })}
                    >
                        <MenuItem value={1}>Activo</MenuItem>
                        <MenuItem value={0}>Inactivo</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancelar</Button>
                    <Button onClick={handleEditSave}>Guardar</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={isAddOpen} onClose={handleAddClose} fullWidth maxWidth="sm">
                <DialogTitle>Agregar Autor</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nombre"
                        type="text"
                        fullWidth
                        value={newData.nombre}
                        onChange={(e) => setNewData({ ...newData, nombre: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Apellido"
                        type="text"
                        fullWidth
                        value={newData.apellido}
                        onChange={(e) => setNewData({ ...newData, apellido: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Fecha de Nacimiento"
                        type="date"
                        fullWidth
                        value={newData.fecha_nacimiento}
                        onChange={(e) => setNewData({ ...newData, fecha_nacimiento: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Nacionalidad"
                        type="text"
                        fullWidth
                        value={newData.nacionalidad}
                        onChange={(e) => setNewData({ ...newData, nacionalidad: e.target.value })}
                    />
                    <TextField
                        select
                        margin="dense"
                        label="Estado"
                        fullWidth
                        value={newData.estado}
                        onChange={(e) => setNewData({ ...newData, estado: e.target.value })}
                    >
                        <MenuItem value={1}>Activo</MenuItem>
                        <MenuItem value={0}>Inactivo</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose}>Cancelar</Button>
                    <Button onClick={handleAddSave}>Guardar</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={isDeleteOpen} onClose={handleDeleteClose} fullWidth maxWidth="sm">
                <DialogTitle>Confirmar Eliminación</DialogTitle>
                <DialogContent>
                    <Typography>¿Estás seguro que deseas realizar esta acción?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose}>No</Button>
                    <Button onClick={handleDeleteConfirm}>Sí</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}

export default Autores;
