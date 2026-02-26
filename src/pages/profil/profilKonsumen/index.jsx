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

const ProfilKonsumen = () => {
  const user = useSessionStore(state => state.user);
  const setUser = useSessionStore(state => state.setUser);
  console.log("DATAUSER:", user);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    nohp: "",
    alamat: ""
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
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={!editMode}
              fullWidth
            />

            <TextField
              label="No Handphone"
              name="nohp"
              value={form.nohp}
              onChange={handleChange}
              disabled={!editMode}
              fullWidth
            />

            <TextField
              label="Alamat"
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              disabled={!editMode}
              multiline
              rows={3}
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