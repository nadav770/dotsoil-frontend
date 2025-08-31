import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  TextField, 
  Switch, 
  FormControlLabel, 
  Divider,
  Button,
  Alert,
  Grid
} from '@mui/material';
import { Settings as SettingsIcon, Save, Refresh } from '@mui/icons-material';

const Settings: React.FC = () => {
  const [apiBaseUrl, setApiBaseUrl] = React.useState('http://localhost:3001/api');
  const [mapTileUrl, setMapTileUrl] = React.useState('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  const [autoRefresh, setAutoRefresh] = React.useState(true);
  const [rtlMode, setRtlMode] = React.useState(true);
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    // כאן בעתיד נשמור ל-localStorage או נשלח לשרת
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setApiBaseUrl('http://localhost:3001/api');
    setMapTileUrl('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    setAutoRefresh(true);
    setRtlMode(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <SettingsIcon sx={{ fontSize: 40, color: 'primary.main' }} />
        <Typography variant="h4">
          הגדרות מערכת
        </Typography>
      </Box>

      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          ההגדרות נשמרו בהצלחה!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* API Settings */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                הגדרות API
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <TextField
                fullWidth
                label="API Base URL"
                value={apiBaseUrl}
                onChange={(e) => setApiBaseUrl(e.target.value)}
                margin="normal"
                helperText="כתובת הבסיס של ה-API (לעתיד)"
                disabled
              />
              
              <TextField
                fullWidth
                label="Map Tile URL"
                value={mapTileUrl}
                onChange={(e) => setMapTileUrl(e.target.value)}
                margin="normal"
                helperText="כתובת מפת העולם (OSM)"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Display Settings */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                הגדרות תצוגה
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={autoRefresh} 
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                  />
                }
                label="רענון אוטומטי של נתונים"
                sx={{ mb: 2 }}
              />
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={rtlMode} 
                    onChange={(e) => setRtlMode(e.target.checked)}
                  />
                }
                label="מצב RTL (עברית)"
                sx={{ mb: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Actions */}
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={handleReset}
                >
                  איפוס הגדרות
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                >
                  שמירת הגדרות
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;