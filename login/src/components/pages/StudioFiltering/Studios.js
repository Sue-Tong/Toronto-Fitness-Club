import React, { useState } from 'react'
import { Paper, makeStyles, TableBody, TableRow} from '@material-ui/core';
import * as StudioListing from './GetAllStudio';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    }
}))

export default function StudiosFiltering() {

    const classes = useStyles();
    const [studios, setStudios] = useState(StudioListing.getAllStudios())
    // const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

    // const {
    //     TblContainer,
    //     TblHead,
    //     TblPagination,
    //     recordsAfterPagingAndSorting
    // } = useTable(records, headCells, filterFn);

    // const handleSearch = e => {
    //     let target = e.target;
    //     setFilterFn({
    //         fn: items => {
    //             if (target.value == "")
    //                 return items;
    //             else
    //                 return items.filter(x => x.fullName.toLowerCase().includes(target.value))
    //         }
    //     })
    // }

    return (
        <>
            
            <Paper className={classes.pageContent}>
                
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            studios.map(studio =>
                                (<TableRow key={studio.id}>
                                    <TableCell>{studio.name}</TableCell>
                                    <TableCell>{studio.location}</TableCell>
                                    <TableCell>{studio.postal_code}</TableCell>
                                    <TableCell>{studio.phone_number}</TableCell>
                                    <TableCell>{studio.address}</TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
        </>
    )
}