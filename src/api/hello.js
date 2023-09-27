
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://atsjxnlexphneggbwgbb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0c2p4bmxleHBobmVnZ2J3Z2JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyMjM3NDcsImV4cCI6MjAxMDc5OTc0N30.QmqbRVLu5i_eyTMAuElz92cPrDOjgk5nrENCdHEddQQ')
