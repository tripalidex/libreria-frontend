import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Grid, TextField } from '@mui/material';
import useAxiosPrivate from '../../../../../../hooks/useAxiosPrivate';

function Libros() {
    const [libros, setLibros] = useState([]);
    const [autores, setAutores] = useState([]);
    const [editoriales, setEditoriales] = useState([]);
    const [editData, setEditData] = useState(null);
    const [isEditOpen, setEditOpen] = useState(false);
    const [isAddOpen, setAddOpen] = useState(false);
    const [newData, setNewData] = useState({
        titulo: '', descripcion: '', precio_unitario: '', stock: '', estado: '',
        fecha_publicacion: '', ruta_img: '', id_categoria: '', id_autor: '', id_editorial: ''
    });
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const [deleteData, setDeleteData] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    const getLibros = async () => {
        try {
            const response = await axiosPrivate.get('/libros');
            setLibros(response.data.map((item) => ({
                id: item.id_libro,
                titulo: item.titulo,
                descripcion: item.descripcion,
                precio_unitario: item.precio_unitario,
                stock: item.stock,
                estado: item.estado ? 'Activo' : 'Inactivo',
                fecha_publicacion: item.fecha_publicacion,
                ruta_img: item.ruta_img,
                categoria: item.categoria ? item.categoria.nombre : '',
                autor: item.autor ? `${item.autor.nombre} ${item.autor.apellido}` : '',
                editorial: item.editorial ? item.editorial.razon_social : ''
            })));
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    const getAutores = async () => {
        try {
            const response = await axiosPrivate.get('/autores');
            setAutores(response.data);
        } catch (error) {
            console.error("Error al obtener los autores:", error);
        }
    };

    const getEditoriales = async () => {
        try {
            const response = await axiosPrivate.get('/editoriales');
            setEditoriales(response.data);
        } catch (error) {
            console.error("Error al obtener las editoriales:", error);
        }
    };

    const addLibro = async (newData) => {
        try {
            const response = await axiosPrivate.post('/libros', newData);
            getLibros();
            return response.data;
        } catch (error) {
            console.error("Error al agregar el libro:", error);
        }
    };

    const editLibro = async (id, updatedData) => {
        try {
            const response = await axiosPrivate.put(`/libros/${id}`, updatedData);
            getLibros();
            return response.data;
        } catch (error) {
            console.error("Error al editar el libro:", error);
        }
    };

    const deleteLibro = async (id) => {
        try {
            const response = await axiosPrivate.patch(`/libros/${id}`);
            getLibros();
            return response.data;
        } catch (error) {
            console.error("Error al eliminar el libro:", error);
        }
    };

    useEffect(() => {
        getLibros();
        getAutores();
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
                titulo: editData.titulo,
                descripcion: editData.descripcion,
                precio_unitario: editData.precio_unitario,
                stock: editData.stock,
                estado: editData.estado,
                fecha_publicacion: editData.fecha_publicacion,
                ruta_img: editData.ruta_img,
                id_categoria: editData.id_categoria,
                id_autor: editData.id_autor,
                id_editorial: editData.id_editorial,
            };
            await editLibro(editData.id, updatedData);
            handleEditClose();
        } catch (error) {
            console.error("Error al guardar el libro:", error);
        }
    };

    const handleAddOpen = () => {
        setAddOpen(true);
    };

    const handleAddClose = () => {
        setAddOpen(false);
        setNewData({
            titulo: '', descripcion: '', precio_unitario: '', stock: '', estado: '',
            fecha_publicacion: '', ruta_img: '', id_categoria: '', id_autor: '', id_editorial: ''
        });
    };

    const handleAddSave = async () => {
        try {
            await addLibro(newData);
            handleAddClose();
        } catch (error) {
            console.error("Error al agregar el libro:", error);
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
            await deleteLibro(deleteData.id);
            handleDeleteClose();
        } catch (error) {
            console.error("Error al eliminar el libro:", error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 120 },
        { field: 'titulo', headerName: 'Título', width: 200 },
        { field: 'descripcion', headerName: 'Descripción', width: 300 },
        { field: 'precio_unitario', headerName: 'Precio Unitario', width: 150 },
        { field: 'stock', headerName: 'Stock', width: 100 },
        { field: 'estado', headerName: 'Estado', width: 120 },
        { field: 'fecha_publicacion', headerName: 'Fecha de Publicación', width: 180 },
        { field: 'ruta_img', headerName: 'Ruta Imagen', width: 200 },
        { field: 'categoria', headerName: 'Categoría', width: 150 },
        { field: 'autor', headerName: 'Autor', width: 150 },
        { field: 'editorial', headerName: 'Editorial', width: 150 },
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
                Libros
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
                <Grid item xs={12} md={4}>
                    <Button variant="contained" onClick={handleAddOpen} fullWidth>
                        Agregar Libro
                    </Button>
                </Grid>
            </Grid>
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <Box sx={{ minWidth: 650 }}>
                    <DataGrid
                        rows={libros}
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
                <DialogTitle>Editar Libro</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Título"
                        type="text"
                        fullWidth
                        value={editData?.titulo || ''}
                        onChange={(e) => setEditData({ ...editData, titulo: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Descripción"
                        type="text"
                        fullWidth
                        value={editData?.descripcion || ''}
                        onChange={(e) => setEditData({ ...editData, descripcion: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Precio Unitario"
                        type="number"
                        fullWidth
                        value={editData?.precio_unitario || ''}
                        onChange={(e) => setEditData({ ...editData, precio_unitario: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Stock"
                        type="number"
                        fullWidth
                        value={editData?.stock || ''}
                        onChange={(e) => setEditData({ ...editData, stock: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Fecha de Publicación"
                        type="date"
                        fullWidth
                        value={editData?.fecha_publicacion || ''}
                        onChange={(e) => setEditData({ ...editData, fecha_publicacion: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Ruta Imagen"
                        type="text"
                        fullWidth
                        value={editData?.ruta_img || ''}
                        onChange={(e) => setEditData({ ...editData, ruta_img: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Categoría"
                        type="text"
                        fullWidth
                        value={editData?.id_categoria || ''}
                        onChange={(e) => setEditData({ ...editData, id_categoria: e.target.value })}
                    />
                    <TextField
                        select
                        margin="dense"
                        label="Autor"
                        fullWidth
                        value={editData?.id_autor || ''}
                        onChange={(e) => setEditData({ ...editData, id_autor: e.target.value })}
                    >
                        {autores.map((autor) => (
                            <MenuItem key={autor.id_autor} value={autor.id_autor}>
                                {autor.nombre} {autor.apellido}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        margin="dense"
                        label="Editorial"
                        fullWidth
                        value={editData?.id_editorial || ''}
                        onChange={(e) => setEditData({ ...editData, id_editorial: e.target.value })}
                    >
                        {editoriales.map((editorial) => (
                            <MenuItem key={editorial.id_editorial} value={editorial.id_editorial}>
                                {editorial.razon_social}
                            </MenuItem>
                        ))}
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
                <DialogTitle>Agregar Libro</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Título"
                        type="text"
                        fullWidth
                        value={newData.titulo}
                        onChange={(e) => setNewData({ ...newData, titulo: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Descripción"
                        type="text"
                        fullWidth
                        value={newData.descripcion}
                        onChange={(e) => setNewData({ ...newData, descripcion: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Precio Unitario"
                        type="number"
                        fullWidth
                        value={newData.precio_unitario}
                        onChange={(e) => setNewData({ ...newData, precio_unitario: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Stock"
                        type="number"
                        fullWidth
                        value={newData.stock}
                        onChange={(e) => setNewData({ ...newData, stock: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Fecha de Publicación"
                        type="date"
                        fullWidth
                        value={newData.fecha_publicacion}
                        onChange={(e) => setNewData({ ...newData, fecha_publicacion: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Ruta Imagen"
                        type="text"
                        fullWidth
                        value={newData.ruta_img}
                        onChange={(e) => setNewData({ ...newData, ruta_img: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Categoría"
                        type="text"
                        fullWidth
                        value={newData.id_categoria}
                        onChange={(e) => setNewData({ ...newData, id_categoria: e.target.value })}
                    />
                    <TextField
                        select
                        margin="dense"
                        label="Autor"
                        fullWidth
                        value={newData.id_autor}
                        onChange={(e) => setNewData({ ...newData, id_autor: e.target.value })}
                    >
                        {autores.map((autor) => (
                            <MenuItem key={autor.id_autor} value={autor.id_autor}>
                                {autor.nombre} {autor.apellido}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        margin="dense"
                        label="Editorial"
                        fullWidth
                        value={newData.id_editorial}
                        onChange={(e) => setNewData({ ...newData, id_editorial: e.target.value })}
                    >
                        {editoriales.map((editorial) => (
                            <MenuItem key={editorial.id_editorial} value={editorial.id_editorial}>
                                {editorial.razon_social}
                            </MenuItem>
                        ))}
                    </TextField>
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

export default Libros;
