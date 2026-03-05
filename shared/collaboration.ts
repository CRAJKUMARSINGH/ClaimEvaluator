/**
 * Multi-User Collaboration System
 * Team workspaces, RBAC, comments, and task management
 */

export enum UserRole {
  ADMIN = 'admin',
  ANALYST = 'analyst',
  VIEWER = 'viewer',
  CLIENT = 'client'
}

export enum Permission {
  // Claim permissions
  CREATE_CLAIM = 'create_claim',
  EDIT_CLAIM = 'edit_claim',
  DELETE_CLAIM = 'delete_claim',
  VIEW_CLAIM = 'view_claim',
  EXPORT_CLAIM = 'export_claim',
  
  // Analysis permissions
  RUN_ANALYSIS = 'run_analysis',
  VIEW_ANALYSIS = 'view_analysis',
  EDIT_ANALYSIS = 'edit_analysis',
  
  // Document permissions
  UPLOAD_DOCUMENT = 'upload_document',
  DELETE_DOCUMENT = 'delete_document',
  VIEW_DOCUMENT = 'view_document',
  
  // Workspace permissions
  MANAGE_WORKSPACE = 'manage_workspace',
  INVITE_MEMBERS = 'invite_members',
  REMOVE_MEMBERS = 'remove_members',
  MANAGE_ROLES = 'manage_roles',
  
  // Comment permissions
  ADD_COMMENT = 'add_comment',
  EDIT_OWN_COMMENT = 'edit_own_comment',
  DELETE_OWN_COMMENT = 'delete_own_comment',
  DELETE_ANY_COMMENT = 'delete_any_comment',
  
  // Task permissions
  CREATE_TASK = 'create_task',
  ASSIGN_TASK = 'assign_task',
  COMPLETE_TASK = 'complete_task',
  VIEW_TASKS = 'view_tasks',
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    // All permissions
    ...Object.values(Permission)
  ],
  [UserRole.ANALYST]: [
    Permission.CREATE_CLAIM,
    Permission.EDIT_CLAIM,
    Permission.VIEW_CLAIM,
    Permission.EXPORT_CLAIM,
    Permission.RUN_ANALYSIS,
    Permission.VIEW_ANALYSIS,
    Permission.EDIT_ANALYSIS,
    Permission.UPLOAD_DOCUMENT,
    Permission.VIEW_DOCUMENT,
    Permission.ADD_COMMENT,
    Permission.EDIT_OWN_COMMENT,
    Permission.DELETE_OWN_COMMENT,
    Permission.CREATE_TASK,
    Permission.ASSIGN_TASK,
    Permission.COMPLETE_TASK,
    Permission.VIEW_TASKS,
  ],
  [UserRole.VIEWER]: [
    Permission.VIEW_CLAIM,
    Permission.VIEW_ANALYSIS,
    Permission.VIEW_DOCUMENT,
    Permission.ADD_COMMENT,
    Permission.EDIT_OWN_COMMENT,
    Permission.DELETE_OWN_COMMENT,
    Permission.VIEW_TASKS,
  ],
  [UserRole.CLIENT]: [
    Permission.VIEW_CLAIM,
    Permission.VIEW_ANALYSIS,
    Permission.VIEW_DOCUMENT,
    Permission.EXPORT_CLAIM,
    Permission.ADD_COMMENT,
    Permission.EDIT_OWN_COMMENT,
    Permission.DELETE_OWN_COMMENT,
  ]
};

export interface Organization {
  id: string;
  name: string;
  industry: string;
  country: string;
  createdAt: Date;
  settings: OrganizationSettings;
}

export interface OrganizationSettings {
  defaultCurrency: string;
  defaultContractType: string;
  branding?: {
    logo?: string;
    primaryColor?: string;
    secondaryColor?: string;
  };
  features: {
    aiAnalysis: boolean;
    advancedAnalytics: boolean;
    collaboration: boolean;
    apiAccess: boolean;
  };
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  organizationId: string;
  createdBy: string;
  createdAt: Date;
  members: WorkspaceMember[];
  claims: string[]; // Claim IDs
  settings: WorkspaceSettings;
}

export interface WorkspaceSettings {
  visibility: 'private' | 'organization' | 'public';
  allowGuestAccess: boolean;
  requireApproval: boolean;
  notificationPreferences: {
    newClaim: boolean;
    claimUpdated: boolean;
    commentAdded: boolean;
    taskAssigned: boolean;
    analysisComplete: boolean;
  };
}

export interface WorkspaceMember {
  userId: string;
  workspaceId: string;
  role: UserRole;
  permissions: Permission[];
  invitedBy: string;
  invitedAt: Date;
  joinedAt?: Date;
  status: 'pending' | 'active' | 'suspended';
}

export interface Comment {
  id: string;
  claimId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  parentId?: string; // For threaded comments
  mentions: string[]; // User IDs mentioned
  attachments?: Attachment[];
  reactions: Reaction[];
}

export interface Reaction {
  userId: string;
  emoji: string;
  createdAt: Date;
}

export interface Attachment {
  id: string;
  filename: string;
  url: string;
  size: number;
  mimeType: string;
}

export interface Task {
  id: string;
  workspaceId: string;
  claimId?: string;
  title: string;
  description?: string;
  assignedTo: string[];
  createdBy: string;
  createdAt: Date;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in_progress' | 'review' | 'completed' | 'cancelled';
  tags: string[];
  checklist?: ChecklistItem[];
  comments: string[]; // Comment IDs
  attachments: Attachment[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  completedBy?: string;
  completedAt?: Date;
}

export interface Activity {
  id: string;
  workspaceId: string;
  userId: string;
  action: ActivityAction;
  entityType: 'claim' | 'analysis' | 'document' | 'comment' | 'task' | 'member';
  entityId: string;
  metadata: Record<string, any>;
  createdAt: Date;
}

export enum ActivityAction {
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
  COMMENTED = 'commented',
  ASSIGNED = 'assigned',
  COMPLETED = 'completed',
  INVITED = 'invited',
  JOINED = 'joined',
  LEFT = 'left',
}

export class CollaborationService {
  /**
   * Check if user has permission
   */
  hasPermission(member: WorkspaceMember, permission: Permission): boolean {
    return member.permissions.includes(permission);
  }

  /**
   * Get all permissions for a role
   */
  getRolePermissions(role: UserRole): Permission[] {
    return ROLE_PERMISSIONS[role];
  }

  /**
   * Create a new workspace
   */
  async createWorkspace(
    name: string,
    organizationId: string,
    createdBy: string,
    settings?: Partial<WorkspaceSettings>
  ): Promise<Workspace> {
    const workspace: Workspace = {
      id: this.generateId(),
      name,
      organizationId,
      createdBy,
      createdAt: new Date(),
      members: [
        {
          userId: createdBy,
          workspaceId: '',
          role: UserRole.ADMIN,
          permissions: ROLE_PERMISSIONS[UserRole.ADMIN],
          invitedBy: createdBy,
          invitedAt: new Date(),
          joinedAt: new Date(),
          status: 'active'
        }
      ],
      claims: [],
      settings: {
        visibility: 'private',
        allowGuestAccess: false,
        requireApproval: true,
        notificationPreferences: {
          newClaim: true,
          claimUpdated: true,
          commentAdded: true,
          taskAssigned: true,
          analysisComplete: true
        },
        ...settings
      }
    };

    workspace.members[0].workspaceId = workspace.id;
    return workspace;
  }

  /**
   * Invite member to workspace
   */
  async inviteMember(
    workspaceId: string,
    userId: string,
    role: UserRole,
    invitedBy: string
  ): Promise<WorkspaceMember> {
    const member: WorkspaceMember = {
      userId,
      workspaceId,
      role,
      permissions: ROLE_PERMISSIONS[role],
      invitedBy,
      invitedAt: new Date(),
      status: 'pending'
    };

    // TODO: Send invitation email
    // TODO: Save to database

    return member;
  }

  /**
   * Add comment to claim
   */
  async addComment(
    claimId: string,
    userId: string,
    content: string,
    parentId?: string,
    attachments?: Attachment[]
  ): Promise<Comment> {
    // Extract mentions from content (@username)
    const mentions = this.extractMentions(content);

    const comment: Comment = {
      id: this.generateId(),
      claimId,
      userId,
      content,
      createdAt: new Date(),
      parentId,
      mentions,
      attachments,
      reactions: []
    };

    // TODO: Save to database
    // TODO: Send notifications to mentioned users

    return comment;
  }

  /**
   * Create task
   */
  async createTask(
    workspaceId: string,
    title: string,
    createdBy: string,
    options?: Partial<Task>
  ): Promise<Task> {
    const task: Task = {
      id: this.generateId(),
      workspaceId,
      title,
      createdBy,
      createdAt: new Date(),
      assignedTo: [],
      priority: 'medium',
      status: 'todo',
      tags: [],
      comments: [],
      attachments: [],
      ...options
    };

    // TODO: Save to database
    // TODO: Send notifications to assigned users

    return task;
  }

  /**
   * Assign task to users
   */
  async assignTask(taskId: string, userIds: string[]): Promise<void> {
    // TODO: Update task in database
    // TODO: Send notifications to assigned users
  }

  /**
   * Update task status
   */
  async updateTaskStatus(
    taskId: string,
    status: Task['status'],
    userId: string
  ): Promise<void> {
    // TODO: Update task in database
    // TODO: Log activity
    // TODO: Send notifications
  }

  /**
   * Log activity
   */
  async logActivity(
    workspaceId: string,
    userId: string,
    action: ActivityAction,
    entityType: Activity['entityType'],
    entityId: string,
    metadata?: Record<string, any>
  ): Promise<Activity> {
    const activity: Activity = {
      id: this.generateId(),
      workspaceId,
      userId,
      action,
      entityType,
      entityId,
      metadata: metadata || {},
      createdAt: new Date()
    };

    // TODO: Save to database
    // TODO: Broadcast to workspace members via WebSocket

    return activity;
  }

  /**
   * Get workspace activity feed
   */
  async getActivityFeed(
    workspaceId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<Activity[]> {
    // TODO: Query database
    return [];
  }

  /**
   * Get user's tasks
   */
  async getUserTasks(
    userId: string,
    workspaceId?: string,
    status?: Task['status']
  ): Promise<Task[]> {
    // TODO: Query database
    return [];
  }

  /**
   * Get claim comments
   */
  async getClaimComments(
    claimId: string,
    includeReplies: boolean = true
  ): Promise<Comment[]> {
    // TODO: Query database
    return [];
  }

  /**
   * Search workspace
   */
  async searchWorkspace(
    workspaceId: string,
    query: string,
    filters?: {
      entityTypes?: Activity['entityType'][];
      dateRange?: { from: Date; to: Date };
      users?: string[];
    }
  ): Promise<any[]> {
    // TODO: Implement full-text search
    return [];
  }

  private extractMentions(content: string): string[] {
    const mentionRegex = /@(\w+)/g;
    const mentions: string[] = [];
    let match;

    while ((match = mentionRegex.exec(content)) !== null) {
      mentions.push(match[1]);
    }

    return mentions;
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

export const collaborationService = new CollaborationService();
