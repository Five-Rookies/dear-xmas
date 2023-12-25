export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      comment_like: {
        Row: {
          comment_id: number
          created_at: string
          id: number
          is_like: string | null
          user_id: string
        }
        Insert: {
          comment_id: number
          created_at?: string
          id?: number
          is_like?: string | null
          user_id: string
        }
        Update: {
          comment_id?: number
          created_at?: string
          id?: number
          is_like?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'comment_like_comment_id_fkey'
            columns: ['comment_id']
            isOneToOne: false
            referencedRelation: 'comments'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'comment_like_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      comments: {
        Row: {
          comment_content: string | null
          created_at: string
          id: number
          profile_img: number | null
          user_id: string | null
          user_name: string | null
          video_id: string | null
        }
        Insert: {
          comment_content?: string | null
          created_at?: string
          id?: number
          profile_img?: number | null
          user_id?: string | null
          user_name?: string | null
          video_id?: string | null
        }
        Update: {
          comment_content?: string | null
          created_at?: string
          id?: number
          profile_img?: number | null
          user_id?: string | null
          user_name?: string | null
          video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'comments_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      live_chat: {
        Row: {
          created_at: string
          id: number
          live_content: string | null
          meetup_id: number | null
          profile_img: number | null
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          live_content?: string | null
          meetup_id?: number | null
          profile_img?: number | null
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          live_content?: string | null
          meetup_id?: number | null
          profile_img?: number | null
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'live_chat_meetup_id_fkey'
            columns: ['meetup_id']
            isOneToOne: false
            referencedRelation: 'meetup_board'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'live_chat_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      meetup_board: {
        Row: {
          category: string | null
          channel_id: string | null
          channel_title: string | null
          created_at: string
          id: number
          meetup_content: string | null
          meetup_like_num: number | null
          meetup_title: string | null
          member_count: number | null
          member_list: string[] | null
          scheduling: string | null
          thumbnail: string | null
          user_name: string | null
          email: string | null
          video_id: string | null
          video_title: string | null
        }
        Insert: {
          category?: string | null
          channel_id?: string | null
          channel_title?: string | null
          created_at?: string
          id?: number
          meetup_content?: string | null
          meetup_like_num?: number | null
          meetup_title?: string | null
          member_count?: number | null
          member_list?: string[] | null
          scheduling?: string | null
          thumbnail?: string | null
          user_name?: string | null
          email?: string | null
          video_id?: string | null
          video_title?: string | null
        }
        Update: {
          category?: string | null
          channel_id?: string | null
          channel_title?: string | null
          created_at?: string
          id?: number
          meetup_content?: string | null
          meetup_like_num?: number | null
          meetup_title?: string | null
          member_count?: number | null
          member_list?: string[] | null
          scheduling?: string | null
          thumbnail?: string | null
          user_name?: string | null
          email?: string | null
          video_id?: string | null
          video_title?: string | null
        }
        Relationships: []
      }
      meetup_comments: {
        Row: {
          comment_content: string | null
          created_at: string
          id: number
          meetup_id: number | null
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          comment_content?: string | null
          created_at?: string
          id?: number
          meetup_id?: number | null
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          comment_content?: string | null
          created_at?: string
          id?: number
          meetup_id?: number | null
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'meetup_comments_meetup_id_fkey'
            columns: ['meetup_id']
            isOneToOne: true
            referencedRelation: 'meetup_board'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'meetup_comments_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      meetup_like: {
        Row: {
          id: number
          is_like: string | null
          meetup_id: number | null
          user_id: string | null
        }
        Insert: {
          id?: number
          is_like?: string | null
          meetup_id?: number | null
          user_id?: string | null
        }
        Update: {
          id?: number
          is_like?: string | null
          meetup_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'meetup_like_meetup_id_fkey'
            columns: ['meetup_id']
            isOneToOne: false
            referencedRelation: 'meetup_board'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'meetup_like_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      my_page: {
        Row: {
          created_at: string
          favored_meetup: number[] | null
          first_survey_answer: number | null
          id: number
          in_progress_meetup: number[] | null
          introduce: string | null
          profiile_img: number | null
          second_survey_answer: number | null
          third_survey_answer: number | null
          user_id: string
          user_name: string
        }
        Insert: {
          created_at?: string
          favored_meetup?: number[] | null
          first_survey_answer?: number | null
          id?: number
          in_progress_meetup?: number[] | null
          introduce?: string | null
          profiile_img?: number | null
          second_survey_answer?: number | null
          third_survey_answer?: number | null
          user_id: string
          user_name: string
        }
        Update: {
          created_at?: string
          favored_meetup?: number[] | null
          first_survey_answer?: number | null
          id?: number
          in_progress_meetup?: number[] | null
          introduce?: string | null
          profiile_img?: number | null
          second_survey_answer?: number | null
          third_survey_answer?: number | null
          user_id?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'my_page_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          email: string | null
          id: string
          password_hint: string | null
          profile_img: number | null
          user_name: string | null
        }
        Insert: {
          email?: string | null
          id: string
          password_hint?: string | null
          profile_img?: number | null
          user_name?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          password_hint?: string | null
          profile_img?: number | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      survey: {
        Row: {
          first_adult: number | null
          first_baby: number | null
          first_child: number | null
          first_stilltrust: number | null
          first_teenager: number | null
          id: string
          second_honest: number | null
          second_pokerface: number | null
          second_pretend: number | null
          second_sell: number | null
          second_throwaway: number | null
          third_clothes: number | null
          third_electronics: number | null
          third_money: number | null
          third_none: number | null
          third_travelticket: number | null
        }
        Insert: {
          first_adult?: number | null
          first_baby?: number | null
          first_child?: number | null
          first_stilltrust?: number | null
          first_teenager?: number | null
          id: string
          second_honest?: number | null
          second_pokerface?: number | null
          second_pretend?: number | null
          second_sell?: number | null
          second_throwaway?: number | null
          third_clothes?: number | null
          third_electronics?: number | null
          third_money?: number | null
          third_none?: number | null
          third_travelticket?: number | null
        }
        Update: {
          first_adult?: number | null
          first_baby?: number | null
          first_child?: number | null
          first_stilltrust?: number | null
          first_teenager?: number | null
          id?: string
          second_honest?: number | null
          second_pokerface?: number | null
          second_pretend?: number | null
          second_sell?: number | null
          second_throwaway?: number | null
          third_clothes?: number | null
          third_electronics?: number | null
          third_money?: number | null
          third_none?: number | null
          third_travelticket?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'survey_id_fkey'
            columns: ['id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      survey2: {
        Row: {
          created_at: string
          first_question: Json
          id: number
          second_question: Json
          third_question: Json
          user_id: string | null
        }
        Insert: {
          created_at?: string
          first_question: Json
          id?: number
          second_question: Json
          third_question: Json
          user_id?: string | null
        }
        Update: {
          created_at?: string
          first_question?: Json
          id?: number
          second_question?: Json
          third_question?: Json
          user_id?: string | null
        }
        Relationships: []
      }
      youtube_test: {
        Row: {
          etag: string | null
          items: string | null
          kind: string | null
          nextpagetoken: string | null
          pageinfo: string | null
          regioncode: string | null
        }
        Insert: {
          etag?: string | null
          items?: string | null
          kind?: string | null
          nextpagetoken?: string | null
          pageinfo?: string | null
          regioncode?: string | null
        }
        Update: {
          etag?: string | null
          items?: string | null
          kind?: string | null
          nextpagetoken?: string | null
          pageinfo?: string | null
          regioncode?: string | null
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never
