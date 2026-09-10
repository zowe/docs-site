# Jobs table view

The Jobs table view in Zowe Explorer provides a powerful, spreadsheet-like interface for viewing and managing z/OS jobs and their details.

This feature is accessible through the Panel's **Zowe Resources** view and offers enhanced data visualization, filtering, and management capabilities beyond the traditional tree view.

## Using the jobs table view

Open the table view from the **Jobs** tree.

### Opening from the Jobs tree

Open the table view from a session node:

1.  In the **Jobs** tree, right-click a session node.
2.  Select **View as Table** from the context menu.

    The table view opens with the jobs associated with the selected session.

## Table view layout

The jobs table view displays jobs with comprehensive job metadata. It includes the following columns:

- **Name**: The job name.
- **Class**: The job class.
- **Owner**: The user ID of the job owner.
- **ID**: The unique job identifier (jobid).
- **Return Code**: The job's return code indicating completion status.
- **Status**: The current job status (ACTIVE, OUTPUT, etc.).
- **Subsystem**: The subsystem where the job is running.
- **Type**: The job type.
- **Job Correlator**: The job correlator value.
- **Phase**: The current job phase.
- **Phase Name**: The descriptive name of the current phase.
- **Time Started**: The timestamp when job execution started.
- **Time Submitted**: The timestamp when the job was submitted.
- **Time Ended**: The timestamp when job execution ended.
- **Error Details**: Details about why the job is not running, if applicable.

## Managing jobs

The table view provides actions for managing your jobs directly from the table.

### Using the context menu

Right-click a row to open the context menu. It contains the following options:

- **Get JCL**: Downloads and displays the Job Control Language (JCL) for the selected job.
- **Display in Tree**: Locates and highlights the selected job in the **Jobs** tree view.
- Additional actions provided by installed Zowe Explorer extensions.

### Bulk job operations

The table view supports bulk operations on multiple selected jobs through action buttons:

#### Downloading jobs

Download spool files for one or more jobs:

1.  Select one or more job rows using the checkboxes.
2.  Click the **Download** button in the action bar at the top of the table.

    The spool files for all selected jobs will be downloaded to your local system.

#### Canceling jobs

Cancel one or more active jobs:

1.  Select one or more job rows with **ACTIVE** status.
2.  Click the **Cancel** button in the action bar.

    The selected active jobs will be canceled.

    :::note

    The **Cancel** action is only available for jobs with **ACTIVE** status.
    :::

#### Deleting jobs

Delete one or more jobs from the system:

1.  Select one or more job rows.
2.  Click the **Delete** button in the action bar.
3.  Confirm the deletion when prompted.

    The selected jobs will be permanently removed from the system.

    :::warning

    Job deletion is irreversible. Ensure you have downloaded any necessary spool files before deleting jobs.
    :::

## Advanced features

The table view includes advanced features for searching, sorting, and filtering job data.

### Sorting and filtering

- **Column Sorting**: Click on any column header to sort the table by that column. The **Name** column is sorted in ascending order by default.
- **Column Filtering**: Use the filter controls available on each column to narrow the displayed jobs.
- **Date Columns**: Sort time columns (Time Started, Time Submitted, Time Ended) chronologically.

### Table navigation

- **Pagination**: Large job lists are automatically paginated for better performance.
- **Row Selection**: Select checkboxes for multiple rows, or use **Select-all**.

### Dynamic title updates

The table title updates dynamically based on the job node context:

- **Job ID Search**: "Jobs with ID: [jobid]" when the session node has a specific job ID search. 
- **Filtered Search**: "Jobs: [owner] | [prefix] | [status]" when the session node has owner, prefix, and status filters applied.
- **General View**: "Jobs" for general job listings.

## Integration with Jobs tree view

The jobs table view maintains seamless integration with the traditional tree view in the **Side Bar**:

- **Display in Tree**: Right-click any job row and select **Display in Tree** to locate the job in the tree view with automatic expansion.
- **Profile Context**: The table view respects the profile context from which it was opened.

## Keyboard shortcuts

- Standard table navigation and selection keyboard shortcuts are supported.
- Use the table's built-in keyboard navigation to move between rows and columns.
