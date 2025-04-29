import { createClient } from '@supabase/supabase-js'

// https://rxqxurnrooxellourkmq.supabase.co
const supabaseUrl = 'YOUR_SUPABASE_URL'

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4cXh1cm5yb294ZWxsb3Vya21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NzUzODYsImV4cCI6MjA2MTQ1MTM4Nn0.6IYmnlzSjPDuhyNrOA_2WpGRpbC-fcSwSWozyV6ztzg
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)