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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
          session_id?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          subject?: string
        }
        Relationships: []
      }
      departments: {
        Row: {
          contact_email: string | null
          created_at: string
          description: string | null
          hod: string | null
          icon: string | null
          id: string
          name: string
          programmes: string[] | null
          school_slug: string
          slug: string
        }
        Insert: {
          contact_email?: string | null
          created_at?: string
          description?: string | null
          hod?: string | null
          icon?: string | null
          id?: string
          name: string
          programmes?: string[] | null
          school_slug: string
          slug: string
        }
        Update: {
          contact_email?: string | null
          created_at?: string
          description?: string | null
          hod?: string | null
          icon?: string | null
          id?: string
          name?: string
          programmes?: string[] | null
          school_slug?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "departments_school_slug_fkey"
            columns: ["school_slug"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["slug"]
          },
        ]
      }
      facilities: {
        Row: {
          created_at: string
          highlights: string[] | null
          id: string
          image_url: string | null
          long_description: string | null
          name: string
          short_description: string | null
          slug: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          long_description?: string | null
          name: string
          short_description?: string | null
          slug: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          long_description?: string | null
          name?: string
          short_description?: string | null
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          id: string
          keywords: string[]
          question: string
          sort_order: number | null
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          id?: string
          keywords?: string[]
          question: string
          sort_order?: number | null
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          id?: string
          keywords?: string[]
          question?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      leaders: {
        Row: {
          bio: string | null
          created_at: string
          id: string
          name: string
          photo_url: string | null
          role: string
          short_note: string | null
          slug: string
          sort_order: number | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          id?: string
          name: string
          photo_url?: string | null
          role: string
          short_note?: string | null
          slug: string
          sort_order?: number | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          id?: string
          name?: string
          photo_url?: string | null
          role?: string
          short_note?: string | null
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      notices: {
        Row: {
          body: string | null
          category: string
          created_at: string
          date_label: string | null
          id: string
          is_new: boolean | null
          notice_date: string | null
          title: string
          url: string | null
        }
        Insert: {
          body?: string | null
          category: string
          created_at?: string
          date_label?: string | null
          id?: string
          is_new?: boolean | null
          notice_date?: string | null
          title: string
          url?: string | null
        }
        Update: {
          body?: string | null
          category?: string
          created_at?: string
          date_label?: string | null
          id?: string
          is_new?: boolean | null
          notice_date?: string | null
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      quick_links: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          external: boolean | null
          icon: string | null
          id: string
          name: string
          slug: string
          sort_order: number | null
          url: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          external?: boolean | null
          icon?: string | null
          id?: string
          name: string
          slug: string
          sort_order?: number | null
          url: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          external?: boolean | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
          sort_order?: number | null
          url?: string
        }
        Relationships: []
      }
      schools: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          short_name: string | null
          slug: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          short_name?: string | null
          slug: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          short_name?: string | null
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
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
