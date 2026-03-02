import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  Divider
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import useSessionStore from '@/stores/useSessionStore';

// Helper function untuk format tanggal ke DD/MM/YYYY
// Handle ISO format "1990-12-31T17:00:00.000Z" dan "31-12-1990" atau "31/12/1990"
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  let day, month, year;
  
  // Jika format ISO (mengandung T), ambil hanya bagian date sebelum T
  if (dateString.includes('T')) {
    const datePart = dateString.split('T')[0]; // "1990-12-31"
    [year, month, day] = datePart.split('-');
  } else if (dateString.includes('-')) {
    // Format DD-MM-YYYY atau YYYY-MM-DD
    const parts = dateString.split('-');
    if (parts[0].length === 4) {
      // YYYY-MM-DD format
      [year, month, day] = parts;
    } else {
      // DD-MM-YYYY format
      [day, month, year] = parts;
    }
  } else if (dateString.includes('/')) {
    // Jika sudah DD/MM/YYYY, return apa adanya
    return dateString;
  }
  
  return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
};

const ProfilKonsumen = () => {
  const user = useSessionStore(state => state.user);
  console.log("USER STATE:", user);
  const setUser = useSessionStore(state => state.setUser);
  console.log("DATAUSER:", user);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    jenis: "",
    tgllahir: "",
    password: ""
  });

  useEffect(() => {
    // contoh ambil dari localStorage / API
    if (user) {
      setUser(user);
      setForm(user);
    }
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {

    const linkUpdateAnggota = "https://script.google.com/macros/s/AKfycbygxgxShdjdNEgT5Cn9ruPyTDGU1dw8v2WLJPGmFgk3MeLvBj6ivhkjBlBZJy285SxD/exec?action=updateAnggota"
    
    // TODO: hit API update profile
    localStorage.setItem("user", JSON.stringify(form));
    setUser(form);
    setEditMode(false);
  };

  if (!user) {
    return <div className="p-10 text-center">Loading...</div>;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <Card className="w-full max-w-2xl rounded-2xl shadow-lg">
        <CardContent className="p-8">
          
          {/* Header */}
          <div className="flex flex-col items-center mb-6">
            <Avatar
              sx={{ width: 100, height: 100 }}
              src={user.foto || ""}
            />
            <h2 className="text-2xl font-bold mt-4">
              {user.nama}
            </h2>
            <p className="text-gray-500">{user.email}</p>
          </div>

          <Divider className="mb-6" />

          {/* Form */}
          <div className="grid gap-4">
            <TextField
              label="Nama Lengkap"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              disabled={!editMode}
              fullWidth
            />

            <TextField
              label="Jenis Kelamin"
              name="jenis"
              value={form.jenis}
              onChange={handleChange}
              disabled={!editMode}
              fullWidth
            />

            <TextField
              label="Tanggal Lahir"
              name="tgllahir"
              value={formatDate(form.tgllahir)}
              onChange={handleChange}
              disabled={!editMode}
              fullWidth
            />
          </div>

          {/* Button */}
          <div className="mt-6 flex justify-end gap-3">
            {editMode ? (
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                Simpan
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => setEditMode(true)}
              >
                Edit Profil
              </Button>
            )}
          </div>

        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilKonsumen