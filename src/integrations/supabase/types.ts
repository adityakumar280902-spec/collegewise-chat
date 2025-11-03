export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      chat_messages: {
        Row: {
          college_id: number | null
          message: string
          message_id: number
          sender_name: string | null
          senior_id: number | null
          sent_at: string | null
        }
        Insert: {
          college_id?: number | null
          message: string
          message_id?: number
          sender_name?: string | null
          senior_id?: number | null
          sent_at?: string | null
        }
        Update: {
          college_id?: number | null
          message?: string
          message_id?: number
          sender_name?: string | null
          senior_id?: number | null
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["college_id"]
          },
          {
            foreignKeyName: "chat_messages_senior_id_fkey"
            columns: ["senior_id"]
            isOneToOne: false
            referencedRelation: "senior_profiles"
            referencedColumns: ["senior_id"]
          },
        ]
      }
      colleges: {
        Row: {
          avg_placement: number | null
          city: string | null
          college_id: number
          college_name: string
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          description: string | null
          image_logo: string | null
          median_placement: number | null
          nirf_rank: number | null
          state: string | null
          type: string | null
          website: string | null
        }
        Insert: {
          avg_placement?: number | null
          city?: string | null
          college_id?: number
          college_name: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          image_logo?: string | null
          median_placement?: number | null
          nirf_rank?: number | null
          state?: string | null
          type?: string | null
          website?: string | null
        }
        Update: {
          avg_placement?: number | null
          city?: string | null
          college_id?: number
          college_name?: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          image_logo?: string | null
          median_placement?: number | null
          nirf_rank?: number | null
          state?: string | null
          type?: string | null
          website?: string | null
        }
        Relationships: []
      }
      comparisons: {
        Row: {
          college_ids: string
          comparison_id: number
          created_at: string | null
          session_id: string
        }
        Insert: {
          college_ids: string
          comparison_id?: number
          created_at?: string | null
          session_id: string
        }
        Update: {
          college_ids?: string
          comparison_id?: number
          created_at?: string | null
          session_id?: string
        }
        Relationships: []
      }
      cutoffs: {
        Row: {
          category: string | null
          closing_rank: number | null
          cutoff_id: number
          exam_type: string | null
          last_updated: string | null
          opening_rank: number | null
          percentile: number | null
          program_id: number | null
          year: number | null
        }
        Insert: {
          category?: string | null
          closing_rank?: number | null
          cutoff_id?: number
          exam_type?: string | null
          last_updated?: string | null
          opening_rank?: number | null
          percentile?: number | null
          program_id?: number | null
          year?: number | null
        }
        Update: {
          category?: string | null
          closing_rank?: number | null
          cutoff_id?: number
          exam_type?: string | null
          last_updated?: string | null
          opening_rank?: number | null
          percentile?: number | null
          program_id?: number | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cutoffs_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["program_id"]
          },
        ]
      }
      programs: {
        Row: {
          annual_fee: number | null
          college_id: number | null
          created_at: string | null
          degree_level: string | null
          duration_years: number | null
          hostel_available: boolean | null
          program_id: number
          program_name: string
          seats_total: number | null
        }
        Insert: {
          annual_fee?: number | null
          college_id?: number | null
          created_at?: string | null
          degree_level?: string | null
          duration_years?: number | null
          hostel_available?: boolean | null
          program_id?: number
          program_name: string
          seats_total?: number | null
        }
        Update: {
          annual_fee?: number | null
          college_id?: number | null
          created_at?: string | null
          degree_level?: string | null
          duration_years?: number | null
          hostel_available?: boolean | null
          program_id?: number
          program_name?: string
          seats_total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "programs_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["college_id"]
          },
        ]
      }
      senior_profiles: {
        Row: {
          available: boolean | null
          college_id: number | null
          contact_link: string | null
          description: string | null
          name: string
          passing_year: number | null
          program_name: string | null
          senior_id: number
        }
        Insert: {
          available?: boolean | null
          college_id?: number | null
          contact_link?: string | null
          description?: string | null
          name: string
          passing_year?: number | null
          program_name?: string | null
          senior_id?: number
        }
        Update: {
          available?: boolean | null
          college_id?: number | null
          contact_link?: string | null
          description?: string | null
          name?: string
          passing_year?: number | null
          program_name?: string | null
          senior_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "senior_profiles_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["college_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
