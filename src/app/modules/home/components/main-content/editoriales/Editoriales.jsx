import useAxiosPrivate from '../../../../../../hooks/useAxiosPrivate';

function Editoriales() {
    const axiosPrivate = useAxiosPrivate();
    const getEditoriales =  async () => { 
        try {
            const response = await axiosPrivate.get('/editoriales');
            console.log(response.data);
            
        } catch (err) {
          
            console.error(err)
        }
    }

    return (
        <button onClick={() => getEditoriales()}>Editoriales</button>
    )
}

export default Editoriales