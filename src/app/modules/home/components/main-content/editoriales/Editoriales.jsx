import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Grid, TextField } from '@mui/material';
import useAxiosPrivate from '../../../../../../hooks/useAxiosPrivate';
import { findHeaderElementFromField } from '@mui/x-data-grid/utils/domUtils';

function Editoriales() {
    const [editoriales, setEditoriales] = useState([]);
    const [editData, setEditData] = useState(null);
    const [isEditOpen, setEditOpen] = useState(false);
    const [isAddOpen, setAddOpen] = useState(false);
    const [newData, setNewData] = useState({ correo_electronico: '', razon_social: '', ruc: '', estado: '' });
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const [deleteData, setDeleteData] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    const getEditoriales = async () => {
        try {
            const response = await axiosPrivate.get('/editoriales');
            console.log("Datos obtenidos del servidor:", response.data);
            setEditoriales(response.data.map((item) => ({
                id: item.id_editorial,
                idEditorial: item.id_editorial,
                correo_electronico: item.correo_electronico,
                estado: item.estado ? 'Activo' : 'Inactivo',
                razon_social: item.razon_social,
                ruc: item.ruc
            })));
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    const addEditorial = async (newData) => {
        try {
            const response = await axiosPrivate.post('/editoriales', newData);
            getEditoriales();
            return response.data;
        } catch (error) {
            console.error("Error al agregar la editorial:", error);
        }
    };

    const editEditorial = async (id, updatedData) => {
        try {
            const response = await axiosPrivate.put(`/editoriales/${id}`, updatedData);
            console.log("Datos enviados al servidor para editar:", updatedData);
            getEditoriales();
            return response.data;
        } catch (error) {
            console.error("Error al editar la editorial:", error);
        }
    };

    const deleteEditorial = async (id) => {
        try {
            const response = await axiosPrivate.patch(`/editoriales/${id}`);
            getEditoriales();
            return response.data;
        } catch (error) {
            console.error("Error al eliminar la editorial:", error);
        }
    };

    useEffect(() => {
        getEditoriales();
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
                correo_electronico: editData.correo_electronico,
                razon_social: editData.razon_social,
                ruc: editData.ruc,
                estado: editData.estado,
            };
            await editEditorial(editData.idEditorial, updatedData);
            handleEditClose();
        } catch (error) {
            console.error("Error al guardar la editorial:", error);
        }
    };

    const handleAddOpen = () => {
        setAddOpen(true);
    };

    const handleAddClose = () => {
        setAddOpen(false);
        setNewData({ correo_electronico: '', razon_social: '', ruc: '', estado: '' });
    };

    const handleAddSave = async () => {
        try {
            await addEditorial(newData);
            handleAddClose();
        } catch (error) {
            console.error("Error al agregar la editorial:", error);
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
            await deleteEditorial(deleteData.idEditorial);
            handleDeleteClose();
        } catch (error) {
            console.error("Error al eliminar la editorial:", error);
        }
    };

    const columns = [
        { field: 'idEditorial', headerName: 'ID Editorial', width: 120 },
        { field: 'correo_electronico', headerName: 'Correo Electrónico', width: 200 },
        { field: 'estado', headerName: 'Estado', width: 120 },
        { field: 'razon_social', headerName: 'Razón Social', width: 180 },
        { field: 'ruc', headerName: 'RUC', width: 130 },
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
                Editoriales
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
                <Grid item xs={12} md={4}>
                    <Button variant="contained" onClick={handleAddOpen} fullWidth>
                        Agregar Editorial
                    </Button>
                </Grid>
            </Grid>
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <Box sx={{ minWidth: 650 }}>
                    <DataGrid
                        rows={editoriales}
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
                <DialogTitle>Editar Editorial</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Correo Electrónico"
                        type="email"
                        fullWidth
                        value={editData?.correo_electronico || ''}
                        onChange={(e) => setEditData({ ...editData, correo_electronico: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Razón Social"
                        type="text"
                        fullWidth
                        value={editData?.razon_social || ''}
                        onChange={(e) => setEditData({ ...editData, razon_social: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="RUC"
                        type="text"
                        fullWidth
                        value={editData?.ruc || ''}
                        onChange={(e) => setEditData({ ...editData, ruc: e.target.value })}
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
                <DialogTitle>Agregar Editorial</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Correo Electrónico"
                        type="email"
                        fullWidth
                        value={newData.correo_electronico}
                        onChange={(e) => setNewData({ ...newData, correo_electronico: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Razón Social"
                        type="text"
                        fullWidth
                        value={newData.razon_social}
                        onChange={(e) => setNewData({ ...newData, razon_social: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="RUC"
                        type="text"
                        fullWidth
                        value={newData.ruc}
                        onChange={(e) => setNewData({ ...newData, ruc: e.target.value })}
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

export default Editoriales;