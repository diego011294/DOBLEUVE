import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ilxazktxkpsdrvelmdfb.supabase.co'; // Reemplaza con tu URL de Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlseGF6a3R4a3BzZHJ2ZWxtZGZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQyNzE5MzQsImV4cCI6MjAzOTg0NzkzNH0.3kWLlg_JHodBo1Y34YvJUuTY5K4UdGLd3G-bI8BhHy0'; // Reemplaza con tu Public API Key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
