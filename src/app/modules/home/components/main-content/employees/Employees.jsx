import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Grid, TextField } from '@mui/material';
import useAxiosPrivate from '../../../../../../hooks/useAxiosPrivate';

function Empleados() {
    const [empleados, setEmpleados] = useState([]);
    const [editData, setEditData] = useState(null);
    const [isEditOpen, setEditOpen] = useState(false);
    const [isAddOpen, setAddOpen] = useState(false);
    const [newData, setNewData] = useState({
        nombre: '', apellido: '', dni: '', estado: '',
        mail: '', contrasena: '', rol: ''
    });
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const [deleteData, setDeleteData] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    const getEmpleados = async () => {
        try {
            const response = await axiosPrivate.get('/catalogoUsuarios');
            setEmpleados(response.data.map((item) => ({
                id: item.id_empleado,
                nombre: item.nombre,
                apellido: item.apellido,
                estado: item.estado ? 'Activo' : 'Inactivo',
                mail: item.mail,
                rol: item.rol
            })));
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    const addEmpleado = async (newData) => {
        try {
            const empleadoResponse = await axiosPrivate.post('/auth/empleados', {
                nombre: newData.nombre,
                apellido: newData.apellido,
                dni: newData.dni,
                estado: true
            });

            const usuarioResponse = await axiosPrivate.post('/auth/register', {
                mail: newData.mail,
                contrasena: newData.contrasena,
                estado: true,
                rol: newData.rol
            });

            getEmpleados();
            return { empleado: empleadoResponse.data, usuario: usuarioResponse.data };
        } catch (error) {
            console.error("Error al agregar el empleado y usuario:", error);
        }
    };

    const editEmpleado = async (id, updatedData) => {
        try {
            const empleadoResponse = await axiosPrivate.put(`/empleados/${id}`, {
                nombre: updatedData.nombre,
                apellido: updatedData.apellido,
                dni: updatedData.dni,
                estado: updatedData.estado
            });

            const usuarioResponse = await axiosPrivate.put(`/auth/register/${id}`, {
                mail: updatedData.mail,
                contrasena: updatedData.contrasena,
                estado: updatedData.estado,
                rol: updatedData.rol
            });

            getEmpleados();
            return { empleado: empleadoResponse.data, usuario: usuarioResponse.data };
        } catch (error) {
            console.error("Error al editar el empleado y usuario:", error);
        }
    };

    const deleteEmpleado = async (id) => {
        try {
            const response = await axiosPrivate.patch(`/empleados/${id}`, { estado: false });
            getEmpleados();
            return response.data;
        } catch (error) {
            console.error("Error al eliminar el empleado:", error);
        }
    };

    useEffect(() => {
        getEmpleados();
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
                dni: editData.dni,
                estado: editData.estado,
                mail: editData.mail,
                contrasena: editData.contrasena,
                rol: editData.rol
            };
            await editEmpleado(editData.id, updatedData);
            handleEditClose();
        } catch (error) {
            console.error("Error al guardar el empleado:", error);
        }
    };

    const handleAddOpen = () => {
        setAddOpen(true);
    };

    const handleAddClose = () => {
        setAddOpen(false);
        setNewData({
            nombre: '', apellido: '', dni: '', estado: '',
            mail: '', contrasena: '', rol: ''
        });
    };

    const handleAddSave = async () => {
        try {
            await addEmpleado(newData);
            handleAddClose();
        } catch (error) {
            console.error("Error al agregar el empleado:", error);
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
            await deleteEmpleado(deleteData.id);
            handleDeleteClose();
        } catch (error) {
            console.error("Error al eliminar el empleado:", error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 120 },
        { field: 'nombre', headerName: 'Nombre', width: 200 },
        { field: 'apellido', headerName: 'Apellido', width: 200 },
        { field: 'estado', headerName: 'Estado', width: 120 },
        { field: 'mail', headerName: 'Mail', width: 200 },
        { field: 'rol', headerName: 'Tipo de Rol', width: 150 },
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
                Empleados
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
                <Grid item xs={12} md={4}>
                    <Button variant="contained" onClick={handleAddOpen} fullWidth>
                        Agregar Empleado
                    </Button>
                </Grid>
            </Grid>
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <Box sx={{ minWidth: 650 }}>
                    <DataGrid
                        rows={empleados}
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
                <DialogTitle>Editar Empleado</DialogTitle>
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
                        label="DNI"
                        type="text"
                        fullWidth
                        value={editData?.dni || ''}
                        onChange={(e) => setEditData({ ...editData, dni: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Mail"
                        type="email"
                        fullWidth
                        value={editData?.mail || ''}
                        onChange={(e) => setEditData({ ...editData, mail: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Contraseña"
                        type="password"
                        fullWidth
                        value={editData?.contrasena || ''}
                        onChange={(e) => setEditData({ ...editData, contrasena: e.target.value })}
                    />
                    <TextField
                        select
                        margin="dense"
                        label="Tipo de Rol"
                        fullWidth
                        value={editData?.rol || ''}
                        onChange={(e) => setEditData({ ...editData, rol: e.target.value })}
                    >
                        <MenuItem value="USER">USER</MenuItem>
                        <MenuItem value="ADMIN">ADMIN</MenuItem>
                    </TextField>
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
                <DialogTitle>Agregar Empleado</DialogTitle>
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
                        label="DNI"
                        type="text"
                        fullWidth
                        value={newData.dni}
                        onChange={(e) => setNewData({ ...newData, dni: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Mail"
                        type="email"
                        fullWidth
                        value={newData.mail}
                        onChange={(e) => setNewData({ ...newData, mail: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Contraseña"
                        type="password"
                        fullWidth
                        value={newData.contrasena}
                        onChange={(e) => setNewData({ ...newData, contrasena: e.target.value })}
                    />
                    <TextField
                        select
                        margin="dense"
                        label="Tipo de Rol"
                        fullWidth
                        value={newData.rol}
                        onChange={(e) => setNewData({ ...newData, rol: e.target.value })}
                    >
                        <MenuItem value="USER">USER</MenuItem>
                        <MenuItem value="ADMIN">ADMIN</MenuItem>
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

export default Empleados;
